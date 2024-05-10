export default function ApartNumberPage() {
  return (
    <>
      <div className="w-[463px] pl-4 gap-3 h-12 pt-5 mx-auto bg-[#FBFBFB] border-b-2 flex items-center">
        <p className="w-[120px]">카테고리</p>
        <p className="w-[337px]">전화번호</p>
      </div>

      <div className="w-[463px] pl-4 h-9 gap-3 mx-auto flex items-center">
        <p className="w-[120px]">관리사무소</p>
        <div className="w-[337px] flex justify-between pr-4">
          <p>02-0000-0000</p>
        </div>
      </div>

      <div className="w-[463px] pl-4 h-9 gap-3 mx-auto flex items-center">
        <p className="w-[120px]">경로당</p>
        <div className="w-[337px] flex justify-between pr-4">
          <p>02-554-2456</p>
        </div>
      </div>

      <div className="w-[463px] pl-4 h-9 gap-3 mx-auto flex items-center">
        <p className="w-[120px]">용산구 의회</p>
        <div className="w-[337px] flex justify-between pr-4">
          <p>02-2199-8780</p>
        </div>
      </div>
    </>
  );
}
