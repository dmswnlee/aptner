import React from "react";

// Props 타입 정의
interface UserPostProps {
  handleEdit: () => void; // 수정 버튼을 눌렀을 때 실행되는 함수
  handleDelete: () => void; // 삭제 버튼을 눌렀을 때 실행되는 함수
}

// UserPost 컴포넌트에 타입 적용
const UserPost: React.FC<UserPostProps> = ({ handleEdit, handleDelete }) => {
  return (
    <div>
      <div className="mt-10 py-10 border-t text-[14px]">
        안녕하세요, 모든 입주민 여러분,
        <br />
        <br /> 보안 강화 안내: 최근 지역 내 소규모 범죄 사건이 증가함에 따라,
        <br /> 아파트 보안을 강화하기 위해 24시간 순찰 시스템을 도입합니다.
        <br /> 이는 다가오는 주부터 시작되오니, 모든 입주민께서는 외출 시 주의를
        기울여 주시기 바랍니다.
        <br />
        <br /> 주차장 정비 작업: 이번 주 금요일부터 주차장 포장 정비 작업이
        진행될 예정입니다.
        <br /> 작업은 새벽 2시부터 오전 6시까지 진행되며, 해당 시간 동안 주차장
        이용이 제한됩니다. <br />
        불편을 최소화하기 위해 입주민 여러분의 협조를 부탁드립니다.
        <br />
        <br /> 재활용품 분리 배출 강화: 환경 보호를 위해 재활용품 분리 배출을
        더욱 철저히 해주시길 부탁드립니다.
        <br /> 특히 플라스틱, 유리, 종이는 깨끗이 세척한 후 배출해주시기
        바랍니다. <br />
        <br />
        <br />
        아파트 도서관 이용 안내: 아파트 내 도서관이 새롭게 개관하였습니다.
        <br />
        입주민 여러분은 언제든지 자유롭게 이용 가능하며, 도서 대출은 관리
        사무소를 통해 등록 후 가능합니다.
        <br />
        <br /> 입주민 대표 회의: 다음 주 목요일 오후 7시에 커뮤니티 센터에서
        입주민 대표 회의가 있을 예정입니다.
        <br />
        <br /> 관심 있는 입주민은 누구나 참석할 수 있으니, 많은 참여
        부탁드립니다.
        <br />
        <br /> 여러분의 삶의 질 향상과 안전을 위해 최선을 다하겠습니다.
        <br />
        <br /> 더욱 편안하고 안전한 주거 환경을 제공하기 위해 노력하는 관리
        사무소가 되겠습니다. 감사합니다.
        <br />
        <br /> 아파트 관리 사무소 드림
      </div>
      <div className="flex gap-3 text-[14px] pb-10 border-b">
        <button
          className="w-[108px] h-[40px] border border-black rounded-[5px]"
          onClick={handleEdit}
        >
          수정
        </button>
        <button
          className="w-[108px] h-[40px] border border-black rounded-[5px]"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default UserPost;
