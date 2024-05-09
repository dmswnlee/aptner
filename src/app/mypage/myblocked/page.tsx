import Button from "@/components/buttons/Button";

export default function MyBlockedPage() {
  return (
    <>
      <div className="w-[613px] mt-[168px] pl-4 gap-3 h-12 pt-5 mx-auto bg-[#FBFBFB] border-b-2 flex items-center">
        <p className="w-[244px]">차단일시</p>
        <p className="w-[337px]">닉네임</p>
      </div>

      <div className="w-[613px] pl-4 h-9 gap-3 mx-auto flex items-center">
        <p className="w-[244px]">24.3.2</p>
        <div className="w-[337px] flex justify-between pr-4">
          <p>패캠v1</p>
          <Button
            text="차단해제"
            className="underline text-gray-500 font-normal border-none underline-offset-2"
          />
        </div>
      </div>

      <div className="w-[613px] pl-4 h-9 gap-3 mx-auto flex items-center">
        <p className="w-[244px]">24.3.2</p>
        <div className="w-[337px] flex justify-between pr-4">
          <p>패캠v1</p>
          <Button
            text="차단해제"
            className="underline text-gray-500 font-normal border-none underline-offset-2"
          />
        </div>
      </div>
    </>
  );
}
