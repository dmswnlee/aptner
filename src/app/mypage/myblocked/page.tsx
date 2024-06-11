"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Pagination } from "antd";

import Button from "@/components/buttons/Button";

import User from "@/assets/images/emoji/user.png";

export default function MyBlockedPage() {
  const { data: session } = useSession();
  const [blocked, setBlocked] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBlockedMembers = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/members/RO000/block`,
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
      console.log(response.data);
      setBlocked(response.data.result.result.blockedMemberList);
      setTotalCount(response.data.result.totalCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchBlockedMembers(currentPage);
    }
  }, [session, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUnblock = async (id: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/members/RO000/unblock`,
        { unBlockedMemberId: id },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log(response.data);
      fetchBlockedMembers(currentPage);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-[50px]">
      <div className="w-[648px] pl-4 gap-3 h-9 mx-auto bg-[#FBFBFB] flex items-center font-semibold">
        닉네임
      </div>

      {blocked.map((member: any) => (
        <div
          key={member.id}
          className="w-[648px] font-semibold px-4 h-14 gap-3 mx-auto border-b flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <img
              src={member.profileImage || User.src}
              className="rounded-full w-[40px] h-[40px] object-cover"
            />
            {member.nickname}
          </div>
          <Button
            text="차단해제"
            className="border p-[5px] bg-[#eaeaea] text-black_100 text-[14px] font-semibold"
            onClick={() => handleUnblock(member.id)}
          />
        </div>
      ))}

      <Pagination
        current={currentPage}
        total={totalCount}
        pageSize={10}
        onChange={handlePageChange}
        className="flex justify-center mt-10"
      />
    </div>
  );
}
