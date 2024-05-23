import React, { useRef, useState, FunctionComponent, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";

// 글자 크기 확장 설정
const Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "24px",
  "36px",
];
Quill.register(Size, true);

const QuillEditor: FunctionComponent = () => {
  const [value, setValue] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);

  const handleTableChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    const [rows, cols] = size.split("x").map(Number);
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        const index = range.index;
        let tableHtml =
          "<table style='width:100%; border-collapse: collapse;'>";
        for (let i = 0; i < rows; i++) {
          tableHtml += "<tr>";
          for (let j = 0; j < cols; j++) {
            tableHtml +=
              "<td style='border: 1px solid #ccc; min-width: 20px; height: 20px;'>&nbsp;</td>";
          }
          tableHtml += "</tr>";
        }
        tableHtml += "</table><p><br/></p>";
        quill.clipboard.dangerouslyPasteHTML(index, tableHtml);
      }
    }
  };

  return (
    <>
      <div
        id="toolbar"
        className="rounded-[5px] bg-gray_00 border border-gray-400 flex justify-center items-center"
      >
        <button className="ql-bold">B</button>
        <button className="ql-underline">U</button>
        <button className="ql-clean">E</button>
        <select className="ql-font">
          <option value="nanumgothic">Nanum Gothic</option>
          <option value="arial">Arial</option>
          <option value="arialblack">Arial Black</option>
          <option value="comicsansms">Comic Sans MS</option>
          <option value="couriernew">Courier New</option>
        </select>
        <select className="ql-size">
          <option value="8px">8</option>
          <option value="10px">10</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px" selected>
            16
          </option>
          <option value="18px">18</option>
          <option value="24px">24</option>
          <option value="36px">36</option>
        </select>
        <select className="ql-color"></select>
        <select className="ql-table-picker" onChange={handleTableChange}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((row) =>
            Array.from({ length: 10 }, (_, i) => i + 1).map((col) => (
              <option key={`${row}x${col}`} value={`${row}x${col}`}>
                {`${row} x ${col}`}
              </option>
            ))
          )}
        </select>
        <button className="ql-align" value=""></button>
        <button className="ql-align" value="center"></button>
        <button className="ql-align" value="right"></button>
        <button className="ql-align" value="justify"></button>
        <button className="ql-link">L</button>
        <button className="ql-image">Img</button>
        <button className="ql-video">Vid</button>
        <button className="ql-fullscreen">FS</button>
        <button className="ql-code-block">Code</button>
        <button className="ql-help">?</button>
      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="내용을 입력하세요."
        modules={{ toolbar: { container: "#toolbar" } }}
        className="mt-2 h-[278px] bg_gray_00"
      />
    </>
  );
};

export default QuillEditor;
