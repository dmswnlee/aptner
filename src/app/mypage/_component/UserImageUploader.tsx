"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import User from "../../../assets/images/emoji/user.png";

interface Profile {
  profileImage: string;
  nickname: string;
}

const UserImageUploader: React.FC = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      handleProfile();
    }
  }, [status]);

  const handleProfile = async () => {
    try {
      const response = await axios.get(
        "https://aptner.site/v1/api/members/RO000/my-pages/profile",
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

  return (
    <div className="border-[1px] rounded-lg h-[118px]">
      <div className="h-[62px] mt-6 mx-6 flex">
        <Image
          src={profile?.profileImage || User.src}
          alt="USER"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div className="ml-3 text-[20px]">
          <div className="flex font-bold">
            <p className="font-bold">{profile?.nickname}</p>
            <p className="font-thin mx-2"> | </p>
            <p>인증 회원</p>
          </div>
          <p>아크로리버뷰신반포</p>
        </div>
      </div>
    </div>
  );
};

export default UserImageUploader;
