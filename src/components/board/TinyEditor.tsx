import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BeatLoader } from "react-spinners";

interface TinyEditorProps {
	initialValue?: string;
	onChange: (content: string) => void; // 부모 컴포넌트에서 변경된 내용을 처리하기 위한 함수
}

const TinyEditor: React.FC<TinyEditorProps> = ({ initialValue = "", onChange }) => {
	const [isLoading, setIsLoading] = useState(true);
	const editorRef = useRef<any>(null);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	const handleEditorChange = (content: string) => {
		onChange(content);
	};

	return (
		<div>
			{isLoading ? (
				<div className="h-[400px] flex justify-center items-center text-[#36d7b7]">
					<BeatLoader />
				</div>
			) : (
				<Editor
					apiKey={`${process.env.NEXT_TINY_API_KEY}`}
					initialValue={initialValue}
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
            }`,
						setup: editor => {
							editor.on("init", () => {
								if (editorRef.current) {
									editorRef.current.setContent(initialValue);
								}
							});
							editor.on("change", () => {
								handleEditorChange(editor.getContent());
							});
						},
					}}
				/>
			)}
		</div>
	);
};

export default TinyEditor;
