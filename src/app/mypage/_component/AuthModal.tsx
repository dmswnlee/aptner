import React from "react";
import { IoClose } from "react-icons/io5";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[1135px] h-[820px] p-[40px] rounded-[8px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl">
          <IoClose />
        </button>
        <h2 className="text-[42px] mt-[40px] font-semibold px-6 py-4 mb-[80px]  border-b-2 border-black">
          본인인증
        </h2>
        <div className="w-[720px] h-[422px] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="name" className="w-[120px]">
              이름
            </label>
            <input
              type="text"
              id="name"
              className="border w-[430px] h-[48px] p-2 rounded-md"
            />
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="residentNumber" className="w-[120px]">
              주민번호
            </label>
            <div className="flex w-3/4 items-center">
              <input
                type="number"
                id="residentNumber"
                className="border w-[240px] h-[48px] p-2 rounded-md"
                placeholder="예)8010105"
              />
              <div className="px-6 text-lg">-</div>
              <input
                type="number"
                className="border w-[54px] h-[48px] p-2 rounded-md"
              />
              <input
                type="password"
                placeholder="******"
                className="ml-[18px] bg-white w-[54px] h-[48px] p-2 rounded-md"
                disabled
              />
            </div>
          </div>

          <div className="flex items-center  gap-4  mb-4">
            <label htmlFor="gender" className="w-[120px]">
              성별
            </label>
            <div className="flex w-[163px] h-[48px] border rounded-md">
              <button className="w-1/2 border-r" name="gender" value="male">
                남자
              </button>
              <button className="w-1/2" name="gender" value="female">
                여자
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4  mb-4">
            <label htmlFor="carrier" className="w-[120px]">
              통신사 선택
            </label>
            <div className="flex flex-wrap w-3/4 space-x-4">
              <label>
                <input type="radio" name="carrier" value="kt" /> KT
              </label>
              <label>
                <input type="radio" name="carrier" value="lg_u_plus" /> LG U+
              </label>
              <label>
                <input type="radio" name="carrier" value="skt" /> SKT
              </label>
              <label>
                <input type="radio" name="carrier" value="kt_mnp" /> KT 알뜰폰
              </label>
              <label>
                <input type="radio" name="carrier" value="lg_u_plus_mnp" /> LG
                U+ 알뜰폰
              </label>
              <label>
                <input type="radio" name="carrier" value="skt_mnp" /> SKT 알뜰폰
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4  mb-4">
            <label htmlFor="phoneNumber" className="w-[120px]">
              휴대폰 인증
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                id="phoneNumber"
                className="border p-2  w-[430px] h-[48px] rounded-md"
                placeholder="연락처 입력"
              />
              <button className="bg-gray_05 w-[120px] text-[16px] text-black_100 px-4 rounded-md">
                인증번호 요청
              </button>
            </div>
          </div>
          <button className="w-[430px] mx-[136px] h-[60px] mt-6 bg-gray_05 text-black_100 py-2 rounded-md">
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
