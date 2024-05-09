export default function ApartMapPage() {
  return (
    <>
      <div className="mt-[179px]">
        <p className="text-[42px] font-semibold ml-1">아파트 소개</p>
      </div>
      <div className="ml-[21px] mt-[15px]">
        <div className="border-2 w-[996px] h-[524px]">아파트지도</div>
        <ul className="mt-6 gap-3 flex flex-col">
          <li>주소</li>
          <li>도로명 서울 서초구 잠원로 117</li>
          <li>지번 잠원동 159</li>
          <li>우편번호 06508</li>
          <li>관리사무소 02-537-5194</li>
        </ul>
      </div>
    </>
  );
}
