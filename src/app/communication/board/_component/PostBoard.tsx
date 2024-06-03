"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";
import FileUploader from "./FileUploader";
import TinyEditor from "@/components/board/TinyEditor";
import Button from "@/components/buttons/Button";
import { IoMdInformationCircleOutline } from "react-icons/io";

// Option interface definition
interface Option {
  label: string;
}

// BoardProps interface definition
interface BoardProps {
  options: Option[];
}

// FormData interface definition
interface FormData {
  categoryCode: string;
  title: string;
  content: string;
}

// SessionData interface definition
interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

// PostBoard component definition
export default function PostBoard({ options }: BoardProps) {
  const [selectedOption, setSelectedOption] = useState(options[0].label); // Manage selected category state
  const [fileNames, setFileNames] = useState<string[]>([]); // Manage file names state
  const [editorContent, setEditorContent] = useState<string>(""); // Manage editor content state
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      categoryCode: options[0].label,
    },
  });

  // Cancel button handler
  const handleCancel = () => {
    router.back();
  };

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    const categoryIndex = options.findIndex((option) => option.label === selectedOption) + 1;
    const categoryCode = `PT${String(categoryIndex).padStart(3, "0")}`;

    // Function to extract the first image
    const extractFirstImage = (content: string) => {
      const imgRegex = /<img src="([^"]+)"[^>]*>/;
      const match = imgRegex.exec(content);
      if (match) {
        return match[1];
      }
      return null;
    };

    const firstImage = extractFirstImage(editorContent);

    // Prepare JSON payload
    const jsonPayload = {
      categoryCode: categoryCode,
      title: data.title,
      content: editorContent, // Keep the full content including the first image URL
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(jsonPayload)], { type: "application/json" })
    );

    if (firstImage) {
      const response = await fetch(firstImage);
      const blob = await response.blob();
      const file = new File([blob], "thumbnail.jpg", { type: blob.type });
      formData.append("image", file);
  
      // Log detailed information about the file
      console.log("Image file details:", {
        name: file.name,
        size: file.size,
        type: file.type
      });
    }
    
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(
        "https://aptner.site/v1/api/posts/RO000",
        formData,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const postId = response.data.result.postId;
      router.push(`/communication/details/${postId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col relative border rounded-[5px] p-5 border-gray_05">
        {/* Dropdown component */}
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={(option) => {
            setSelectedOption(option);
            setValue("categoryCode", option);
          }}
        />
        {/* Title input field */}
        <input
          className="px-[18px] py-[15px] rounded-[5px] border text-[16px] placeholder:text-[16px] placeholder:text-gray_06 focus:border-gray_05 outline-gray_05 leading-[18px]"
          {...register("title")}
          type="text"
          placeholder="제목을 입력하세요"
        />

        {/* File uploader component */}
        <FileUploader fileNames={fileNames} setFileNames={setFileNames} />

        {/* Legal warning message */}
        <div className="border-t mt-4 text-center font-xl leading-[18px] text-[#222]">
          <div className="mt-4 mb-[18px] py-[10px] border bg-[#f7f7f7]">
            <p className="flex justify-center items-center gap-1">
              <IoMdInformationCircleOutline className="text-[20px]" />
              게시글 작성시 욕설, 비방, 허위사실 유포 등의 내용이 포함되어 있을 경우 명예훼손으로 법적 처벌이 이루어질 수 있습니다.
            </p>
            <p>서로의 의견을 경청하고 존중해 주세요.</p>
          </div>
        </div>

        {/* TinyEditor component */}
        <TinyEditor onChange={(content: string) => setEditorContent(content)} />
      </div>
      <div className="flex justify-center mt-10 mb-20 gap-4">
        <Button
          text="취소"
          className="w-[108px] h-9 text-[14px] bg-gray_04 text-black_100"
          onClick={handleCancel}
        />
        <button
          type="submit"
          className="w-[108px] h-9 text-[14px] rounded-[5px] bg-[#EBF7FF] text-[#1674B7]"
        >
          작성
        </button>
      </div>
    </form>
  );
}
