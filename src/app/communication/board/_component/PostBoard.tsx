'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import TinyEditor from '@/components/board/TinyEditor';
import Button from '@/components/buttons/Button';
import FileUpload from './FileUploader';
import Dropdown from './Dropdown';
import SizeSelection from './SizeSelection';
import { IoMdInformationCircleOutline } from 'react-icons/io';

interface Option {
  label: string;
}

interface BoardProps { 
  options: Option[];
}

interface FormData {
  categoryCode: string;
  title: string;
  content: string;
}

interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

interface FileInfo {
  id: number;
  name: string;
  path: string;
  size: number;
  file?: File;
}

interface Size {
  id: number;
  area: number;
  imagePath: string;
}

export default function PostBoard({ options }: BoardProps) {
  const [selectedOption, setSelectedOption] = useState(options[0].label);
  const [selectedSize, setSelectedSize] = useState<string>('1'); // Default to id 1
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [editorContent, setEditorContent] = useState<string>('');
  const [sizes, setSizes] = useState<Size[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);

  const handleCancel = () => {
    router.back();
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles((currentFiles) => {
      const updatedFiles = currentFiles.filter((file) => file.name !== fileName);
      return updatedFiles;
    });
  };

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      categoryCode: options[0].label,
    },
  });

  useEffect(() => {
    const queryParams = searchParams;
    const id = queryParams.get('id');
    if (id) {
      const editPostData = sessionStorage.getItem('editPostData');
      if (editPostData) {
        const { category, title, content, fileInfoList } = JSON.parse(editPostData);
        setIsEdit(true);
        setPostId(id);
        setValue('categoryCode', category);
        setSelectedOption(category);
        setValue('title', title);
        setEditorContent(content);

        if (fileInfoList) {
          setFiles(fileInfoList);
        }

        sessionStorage.removeItem('editPostData');
      }
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    if (selectedOption === '인테리어') {
      fetchSizes();
    }
  }, [selectedOption]);

  useEffect(() => {
    if (selectedOption === '인테리어') {
      setSelectedSize('1'); // Default to id 1
    }
  }, [selectedOption]);

  const fetchSizes = async () => {
    if (!session) return;
    const { accessToken } = session as SessionData;

    try {
      const response = await axios.get('https://aptner.site/v1/api/posts/RO000/area', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data); // Log the response data to inspect it
      const data = response.data.result.apartAreaList;
      setSizes(data);
    } catch (error) {
      console.error('Error fetching sizes:', error);
    }
  };

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    const categoryIndex = options.findIndex((option) => option.label === selectedOption) + 1;
    const categoryCode = `PT${String(categoryIndex).padStart(3, '0')}`;

    const jsonPayload: any = {
      categoryCode: categoryCode,
      title: data.title,
      content: editorContent,
    };

    if (selectedOption === '인테리어' && selectedSize) {
      const selectedSizeInfo = sizes.find((size) => size.id.toString() === selectedSize);
      if (selectedSizeInfo) {
        jsonPayload.apartAreaId = selectedSizeInfo.id;
      }
    }

    formData.append('request', new Blob([JSON.stringify(jsonPayload)], { type: 'application/json' }));

    const firstImage = editorContent.match(/<img[^>]+src="([^">]+)/);
    if (firstImage && firstImage.length > 1) {
      const imageUrl = firstImage[1];
      try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
        formData.append('image', imageBlob, 'image.jpg');
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    files.forEach((fileInfo) => {
      if (fileInfo.file) {
        formData.append('files', fileInfo.file);
      }
    });

    try {
      if (isEdit && postId) {
        const response = await axios.patch(
          `https://aptner.site/v1/api/posts/RO000/${postId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${(session as SessionData).accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        router.push(`/communication/details/${postId}`);
      } else {
        const response = await axios.post(
          'https://aptner.site/v1/api/posts/RO000',
          formData,
          {
            headers: {
              Authorization: `Bearer ${(session as SessionData).accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const newPostId = response.data.result.postId;
        router.push(`/communication/details/${newPostId}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col relative border rounded-[5px] p-5 border-gray_05">
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setValue={setValue}
        />
        <input
          className="px-[18px] py-[15px] rounded-[5px] border text-[16px] placeholder:text-[16px] placeholder:text-gray_06 focus:border-gray_05 outline-gray_05 leading-[18px]"
          {...register('title')}
          type="text"
          placeholder="제목을 입력하세요"
        />
        <FileUpload files={files} setFiles={setFiles} handleRemoveFile={handleRemoveFile} />
        {selectedOption === '인테리어' && (
          <SizeSelection selectedSize={selectedSize} setSelectedSize={setSelectedSize} sizes={sizes} />
        )}
        <div className="border-t mt-4 text-center font-xl leading-[18px] text-[#222]">
          <div className="mt-4 mb-[18px] py-[10px] border bg-[#f7f7f7]">
            <p className="flex justify-center items-center gap-1">
              <IoMdInformationCircleOutline className="text-[20px]" />
              게시글 작성시 욕설, 비방, 허위사실 유포 등의 내용이 포함되어 있을
              경우 명예훼손으로 법적 처벌이 이루어질 수 있습니다.
            </p>
            <p>서로의 의견을 경청하고 존중해 주세요.</p>
          </div>
        </div>
        <TinyEditor initialValue={editorContent} onChange={(content) => setEditorContent(content)} />
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
