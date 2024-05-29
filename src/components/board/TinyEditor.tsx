import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BeatLoader } from "react-spinners";

const TinyEditor = () => {
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
            "advcode autolink emoticons image link lists media table wordcount checklist mediaembed formatpainter pageembed linkchecker tinymcespellchecker editimage autocorrect typography inlinecss fullscreen help emoticons",
          toolbar:
            "blocks fontfamily fontsize bold underline removeformat emoticons align table link image media code fullscreen help",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          placeholder: "내용을 입력하세요.",
          menubar: false,
          statusbar: false,
          content_style: `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: #BBB;
          } `,
        }}
      />
    </div>
  );
};

export default TinyEditor;
