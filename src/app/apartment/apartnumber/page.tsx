export default function ApartNumberPage() {
  return (
    <>
      <div className="w-[658px] gap-3 py-4 mx-auto mt-5 text-center text-black_100 bg-[#F7f7f7] border-y border-[#2a3f6d] flex items-center">
        <p className="w-[118px] font-semibold">카테고리</p>
        <p className="w-[540px] font-semibold">전화번호</p>
      </div>

      <div className="w-[658px] text-center py-4 gap-3 mx-auto flex items-center border-b border-gray_05">
        <p className="w-[118px]">관리사무소</p>
        <p className="w-[540px]">02-0000-0000</p>
      </div>

      <div className="w-[658px] text-center py-4 gap-3 mx-auto flex items-center border-b border-gray_05">
        <p className="w-[118px]">경로당</p>
        <p className="w-[540px]">02-554-2456</p>
      </div>

      <div className="w-[658px] text-center py-4 gap-3 mx-auto flex items-center border-b border-gray_05">
        <p className="w-[120px]">용산구 의회</p>
        <p className="w-[540px]">02-2199-8780</p>
      </div>
    </>
  );
}
