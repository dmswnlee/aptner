"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import UserEdit from "../_component/UserEdit";
import VerificationModal from "@/components/modal/VerificationModal";

export default function MyAuth() {
  const { data: session, status } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  interface Profile {
    name: string;
    phone: string;
  }
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      handleProfile();
    }
  }, [status]);

  const handleProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/members/RO000/my-pages/profile`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log(response.data);
      setProfile(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const phone = profile?.phone;

  return (
    <>
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0 top-[-30px]">
          <UserEdit />
        </div>
        <div className="w-[586px] relative">
          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label>이름</label>
            <div className="flex flex-col h-[56px]">
              <input
                type="text"
                placeholder={profile?.name}
                className="border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none"
                disabled
              />
            </div>
          </div>

          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label>휴대폰 번호</label>
            <div className="flex flex-col h-[56px]">
              <input
                type="text"
                placeholder={profile?.phone}
                className="border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4 mt-[88px] mb-[130px]">
          <button
            type="button"
            className="py-4 px-5 w-[430px] rounded-[5px] bg-blue_05 text-white cursor-pointer"
            onClick={openAuthModal}
          >
            변경하기
          </button>
        </div>
      </div>
      {isAuthModalOpen && phone && (
        <VerificationModal onClose={closeAuthModal} phone={phone} />
      )}
    </>
  );
}
