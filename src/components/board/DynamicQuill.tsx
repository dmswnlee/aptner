// DynamicQuill.js
import React, { useEffect } from "react";
import Quill from "quill";

const DynamicQuill = () => {
  useEffect(() => {
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
    Quill.register(Font, true);

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
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export default DynamicQuill;
