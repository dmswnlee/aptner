"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Pagination } from "antd";

interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}

interface Post {
  id: number;
  category: Category;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export default function MyPostsPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<
    { id: number; type: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [allSelected, setAllSelected] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getPosts(currentPage);
    }
  }, [status, currentPage]);

  const getPosts = async (page: number) => {
    try {
      const response = await axios.get(
        "https://aptner.site/v1/api/members/RO000/posts",
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
      const postsData = response.data?.result?.result.myArticleList;
      if (postsData) {
        setPosts(postsData);
        setTotalCount(response.data.result.totalCount);
      } else {
        console.log("No posts found in response data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAll = () => {
    const allSelectedStatus = !allSelected;
    setAllSelected(allSelectedStatus);
    if (allSelectedStatus) {
      const newSelectedPosts = posts.map((post) => ({
        id: post.id,
        type: post.category.type,
      }));
      setSelectedPosts(newSelectedPosts);
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (id: number, type: string) => {
    const isSelected = selectedPosts.find((post) => post.id === id);
    if (isSelected) {
      setSelectedPosts(selectedPosts.filter((post) => post.id !== id));
    } else {
      setSelectedPosts([...selectedPosts, { id, type }]);
    }
  };

  const handleDelete = async () => {
    const postIds = selectedPosts
      .filter((post) => post.type === "POST")
      .map((post) => post.id);
    const qnaIds = selectedPosts
      .filter((post) => post.type === "QNA")
      .map((post) => post.id);

    try {
      const response = await axios.delete(
        "https://aptner.site/v1/api/members/RO000/posts",
        {
          data: {
            postIds,
            qnaIds,
          },
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setSelectedPosts([]);
      getPosts(currentPage);
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
              선택
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
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="contents">
                  <div className="border-b h-[60px] py-4 flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={selectedPosts.some(
                        (selectedPost) => selectedPost.id === post.id
                      )}
                      onChange={() =>
                        handleSelectPost(post.id, post.category.type)
                      }
                    />
                  </div>
                  <Link
                    href={`/complaints/detail/${post.id}`}
                    className="border-b py-4 pl-3 gap-[3px] flex items-center"
                  >
                    {post.title}
                  </Link>
                  <div className="border-b py-4 flex justify-center">
                    {post.category.name}
                  </div>
                  <div className="border-b py-4 flex justify-center">
                    {new Date(post.createdAt).toLocaleDateString()}
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
