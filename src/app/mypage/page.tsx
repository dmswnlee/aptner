import Button from "@/components/buttons/Button";
import Input from "../../components/Input/Input";
export default function MyPage() {
  return (
    <>
      <div className="ml-[21px] flex flex-col items-center">
        <div className="mt-[22px] w-[586px] h-[672px] relative">
          <div className="flex justify-between items-center h-12">
            <p className="text-[20px]">아이디</p>
            <p className="w-[428px] ml-[10px] pl-[30px]">fastcampus</p>
          </div>
          <Input
            id="password"
            label="현재 비밀번호"
            type="text"
            placeholder="fastcampus_v1"
          />
          <Input
            id="password"
            label="새 비밀번호"
            type="text"
            placeholder="fastcampus_v1"
          />
          <Input
            id="password"
            label="새 비밀번호 확인"
            type="text"
            placeholder="fastcampus_v1"
          />
          <Input
            id="phoneNumber"
            label="휴대폰 번호"
            type="text"
            placeholder="010-1234-5678"
          />
          <Input id="username" label="이름" type="text" placeholder="홍길동" />
          <Input
            id="username"
            label="닉네임"
            type="text"
            placeholder="패스트캠퍼스"
          />
          <Input id="id" label="아파트 동" type="text" placeholder="101동" />
          <Input id="id" label="아파트 호" type="text" placeholder="103호" />
          <Button
            text="탈퇴하기"
            className="absolute right-0 underline border-none text-gray-500 font-normal mt-[19px]"
          />
        </div>
      </div>

      <div className="flex justify-center pt-4 mt-[66px]">
        <Button
          text="수정하기"
          className="py-3 px-4 border-primary text-primary"
        />
      </div>
    </>
  );
}
