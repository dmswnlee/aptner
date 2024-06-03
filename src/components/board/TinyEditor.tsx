import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BeatLoader } from "react-spinners";

interface TinyEditorProps {
  onChange: (content: string) => void; // 부모 컴포넌트에서 변경된 내용을 처리하기 위한 함수
}

const TinyEditor: React.FC<TinyEditorProps> = ({ onChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return (
      <div className="h-[400px] flex justify-center items-center text-[#36d7b7]">
        <BeatLoader />
      </div>
    );
  }
  return (
    <div>
      <Editor
        apiKey="mmcszsrwbeo7gmf59jj7p3rez05930o3lfv01s7qz44ts2pe"
        init={{
          plugins:
            "advcode autolink emoticons image link lists media table wordcount checklist mediaembed formatpainter pageembed linkchecker tinymcespellchecker editimage autocorrect typography fullscreen help emoticons",
          toolbar:
            "blocks fontfamily fontsize bold underline removeformat emoticons align table link image media code fullscreen help",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          placeholder: "내용을 입력하세요.",
          menubar: false,
          statusbar: false,
          content_style: `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: #BBB;
          `,
        }}
        onEditorChange={(content) => {
          onChange(content); // 에디터에서 내용이 변경될 때마다 호출됨
        }}
      />
    </div>
  );
};

export default TinyEditor;
