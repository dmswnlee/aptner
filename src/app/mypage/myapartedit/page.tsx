import Button from "@/components/buttons/Button";
import Input from "@/components/Input";
import UserEdit from "../_component/UserEdit";

export default function MyApartEditPage() {
  return (
    <div className="w-[1080px] mx-auto relative">
      <div className="absolute left-0 top-[-30px]">
        <UserEdit />
      </div>
      <div className="w-[528px] mx-auto">
        <div className="flex items-center justify-between">
          <p className="text-[20px] leading-[18px]">아파트 변경</p>
          <Button
            text="아파트 변경하기"
            className="border-blue_05 text-blue_05 py-[6px] px-2 box-border"
          />
        </div>
        <Input id="id" label="아파트 동" type="text" placeholder="101동" />
        <Input id="id" label="아파트 호" type="text" placeholder="103호" />
      </div>
    </div>
  );
}
