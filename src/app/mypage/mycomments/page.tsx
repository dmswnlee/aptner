"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Pagination } from "antd";

interface Article {
  id: number;
  title: string;
  createdAt: string;
  category: Category;
}

interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  article: Article;
}

export default function MyCommentsPage() {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComments, setSelectedComments] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [allSelected, setAllSelected] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getComments(currentPage);
    }
  }, [status, currentPage]);

  const getComments = async (page: number) => {
    try {
      const response = await axios.get(
        "https://aptner.site/v1/api/members/RO000/comments",
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          params: {
            page: page,
            size: 10,
            sort: "LATEST",
          },
        }
      );
      console.log(response.data); // 응답을 로깅하여 데이터 구조를 확인합니다.
      const commentsData = response.data?.result?.result.myCommentList;
      if (commentsData) {
        setComments(commentsData);
        setTotalCount(response.data.result.totalCount);
      } else {
        console.log("No comments found in response data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAll = () => {
    const allSelectedStatus = !allSelected;
    setAllSelected(allSelectedStatus);
    if (allSelectedStatus) {
      const newSelectedComments = comments.map((comment) => comment.id);
      setSelectedComments(newSelectedComments);
    } else {
      setSelectedComments([]);
    }
  };

  const handleSelectComment = (id: number) => {
    const isSelected = selectedComments.includes(id);
    if (isSelected) {
      setSelectedComments(
        selectedComments.filter((commentId) => commentId !== id)
      );
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "https://aptner.site/v1/api/members/RO000/comments",
        {
          data: {
            commentIds: selectedComments,
          },
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setSelectedComments([]);
      getComments(currentPage);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col items-center mb-[100px]">
        <div className="max-h-[1021px] mb-5 border-t border-b border-t-[#2a3f6d] relative">
          <div className="grid grid-cols-[112px,732px,118px,118px]">
            {/* Header */}
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              글 제목
            </div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              카테고리
            </div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              등록일
            </div>

            {/* Data */}
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="contents">
                  <div className="border-b h-[60px] py-4 flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={selectedComments.includes(comment.id)}
                      onChange={() => handleSelectComment(comment.id)}
                    />
                  </div>
                  <Link
                    href={`/complaints/detail/${comment.article.id}`}
                    className="border-b py-4 pl-3 gap-[3px] flex items-center"
                  >
                    {comment.content}
                  </Link>
                  <div className="border-b py-4 flex justify-center">
                    {comment.article.category.name}
                  </div>
                  <div className="border-b py-4 flex justify-center">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center col-span-4">
                게시물이 없습니다.
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-between mb-10">
          <div className="w-[112px] flex justify-center items-center relative">
            <input
              type="checkbox"
              id="checkbox"
              className="w-5 h-5"
              checked={allSelected}
              onChange={handleSelectAll}
            />
            <label htmlFor="checkbox" className="absolute right-[-15px]">
              전체선택
            </label>
          </div>

          <button
            onClick={handleDelete}
            className="flex justify-center items-center gap-[2px] right-0 bg-[#3ABEFF] rounded-[5px] text-white w-[78px] h-[36px] text-[14px]"
          >
            삭제
          </button>
        </div>
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={10}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
