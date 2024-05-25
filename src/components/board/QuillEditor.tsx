"use client";
import React, { useState, FunctionComponent, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
// import { MdHelp } from "react-icons/md";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuillEditor: FunctionComponent = () => {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 클라이언트 사이드에서만 실행됨
      const Quill = require("quill"); // Quill 라이브러리를 동적으로 로드

      const Font = Quill.import("attributors/style/font");
      Font.whitelist = [
        "nanumgothic",
        "arial",
        "arialblack",
        "comic-sans-ms",
        "courier-new",
        "helvetica-neue",
        "helvetica",
        "impact",
        "lucida-grande",
        "tahoma",
        "times-new-roman",
        "verdana",
      ];
      Quill.register(Font, true); // Quill에 폰트 설정을 등록

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
      Quill.register(Size, true); // Quill에 폰트 크기 설정을 등록
    }
  }, []);
  return (
    <>
      <div
        id="toolbar"
        className="rounded-[5px] bg-gray_00 border border-gray-400 flex justify-center items-center"
      >
        <select className="ql-header">
          <option value="h1">h1</option>
          <option value="h2">h2</option>
          <option value="h2">h3</option>
          <option value="h2">h4</option>
          <option value="h2">h5</option>
        </select>

        <button className="ql-bold">B</button>
        <button className="ql-underline">U</button>
        <button className="ql-clean">T</button>
        <select className="ql-font">
          <option value="nanumgothic">Nanum Gothic</option>
          <option value="arial">Arial</option>
          <option value="arialblack">Arial Black</option>
          <option value="comic-sans-ms">Comic Sans MS</option>
          <option value="courier-new">Courier New</option>
          <option value="helvetica-neue">Helvetica Neue</option>
          <option value="helvetica">Helvetica</option>
          <option value="impact">Impact</option>
          <option value="lucida-grande">Lucida Grande</option>
          <option value="tahoma">Tahoma</option>
          <option value="times-new-roman">Times New Roman</option>
          <option value="verdana">Verdana</option>
        </select>

        <select className="ql-size" defaultValue="18px">
          <option value="8px">8px</option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="24px">24px</option>
          <option value="36px">36px</option>
        </select>
        <select className="ql-color"></select>

        <select className="ql-align" defaultValue="justify">
          <option value=""></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
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
