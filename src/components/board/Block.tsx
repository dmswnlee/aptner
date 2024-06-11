import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

interface TooltipProps {
  nickname: string;
  userId: number;
  onClose: () => void;
}

interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

const Block: React.FC<TooltipProps> = ({ userId, onClose }) => {
  const { data: session } = useSession();

  const handleBlockUser = async () => {
    if (!session) {
      console.log("No session found");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/members/RO000/block`,
        {
          blockedMemberId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
        }
      );
      console.log("Response from server:", response);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        alert("본인 계정은 차단할 수 없습니다.");
      } else {
        console.error("Error blocking user:", err);
      }
    }

    onClose();
  };

  return (
    <div className="absolute bg-white border border-gray-300 shadow-lg rounded p-2 mt-2 z-50">
      <button className="w-full text-center px-2 py-1 hover:bg-gray-100">
        작성글 검색
      </button>
      <button
        onClick={handleBlockUser}
        className="w-full text-center px-2 py-1 hover:bg-gray-100"
      >
        차단
      </button>
    </div>
  );
};

export default Block;
