import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const ToastEditor: React.FC = () => {
  return (
    <>
      <Editor
        initialValue=" "
        initialEditType="wysiwyg"
        previewStyle="vertical"
        height="400px"
        placeholder="내용을 입력하세요."
        hideModeSwitch={true}
      />
    </>
  );
};

export default ToastEditor;
