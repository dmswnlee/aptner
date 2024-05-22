"use client";
import { useState } from "react";
import Modal from "../modal/Modal"; // 모달 컴포넌트를 임포트

const Menu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState(""); // 모달에 표시할 텍스트 상태

  const openModal = (text: string) => {
    setModalText(text);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false); // 모달을 닫는 함수

  return (
    <div className="sticky top-[48px] mt-[48px] ml-auto text-black w-[60px] h-[210px] flex flex-col items-center text-[12px]">
      <div className="w-full text-center p-[6px] bg-blue_300 text-white font-semibold">
        빠른 메뉴
      </div>
      <button
        onClick={() => openModal("추후 제공될 서비스 입니다.")}
        className="w-[60px] text-center h-[60px] border-b"
      >
        일정
      </button>
      <button
        onClick={() => openModal("추후 제공될 서비스 입니다.")}
        className="w-[60px] text-center h-[60px] border-b"
      >
        방문차량
      </button>
      <button
        onClick={() => openModal("추후 제공될 서비스 입니다.")}
        className="w-[60px] text-center h-[60px] border-b"
      >
        관리비
      </button>
      <button
        onClick={() => openModal("추후 제공될 서비스 입니다.")}
        className="w-[60px] text-center h-[60px]"
      >
        커뮤니티
        <br />
        센터
      </button>
      {modalVisible && <Modal text={modalText} onClose={closeModal} />}
    </div>
  );
};

export default Menu;
