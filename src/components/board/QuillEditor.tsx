import React, { useRef, useState, FunctionComponent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { MdHelp } from "react-icons/md";

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

  return (
    <>
      <div
        id="toolbar"
        className="rounded-[5px] bg-gray_00 border border-gray-400 flex justify-center items-center"
      >
        <button className="ql-bold">B</button>
        <button className="ql-underline">U</button>
        <button className="ql-clean">T</button>
        <select className="ql-font">
          <option value="nanumgothic">Nanum Gothic</option>
          <option value="arial">Arial</option>
          <option value="arialblack">Arial Black</option>
          <option value="comicsansms">Comic Sans MS</option>
          <option value="couriernew">Courier New</option>
        </select>
        <select className="ql-size">
          <option value="8px">8px</option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px" selected>
            18px
          </option>
          <option value="24px">24px</option>
          <option value="36px">36px</option>
        </select>
        <select className="ql-color"></select>

        <select className="ql-align">
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify" selected></option>
        </select>
        <button className="ql-link">L</button>
        <button className="ql-image">Img</button>
        <button className="ql-video">Vid</button>
        {/* <button className="ql-fullscreen">FS</button> */}
        <button className="ql-code-block">Code</button>
        {/* <button className="ql-help">
          <MdHelp />
        </button> */}
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
