import Image from "next/image";
import Image12 from "../../../assets/images/apartment/image12.png";
import Image13 from "../../../assets/images/apartment/image13.png";
import Image14 from "../../../assets/images/apartment/image14.png";

export default function ApartUnitPage() {
  return (
    <div className="w-[1080px] mx-auto mb-[76px]">
      <div className="pb-8 border-b border-gray_600">
        <p className="w-[88px] h-12 flex justify-center items-center text-white text-[20px] rounded-lg bg-gray_800 font-medium">
          84m²A
        </p>
        <div className="pb-8 flex gap-8">
          <Image src={Image12} alt="집 구조" width={410} height={410} />
          <div className="w-[406px] p-8 flex flex-col justify-center text-[16px] leading-nomal font-medium">
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>주거전용면적</li>
              <li>84.86m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>주거공용면적</li>
              <li>26.06m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>공용면적</li>
              <li>110.92m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>기타공용면적</li>
              <li>51.78m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>계약면적</li>
              <li>162.71m²</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-8 border-b border-gray_600">
        <p className="w-[88px] h-12 flex justify-center items-center text-white text-[20px] rounded-lg bg-gray_800 font-medium">
          84m²B
        </p>
        <div className="pb-8 flex gap-8">
          <Image src={Image13} alt="집 구조" width={410} height={410} />
          <div className="w-[406px] p-8 flex flex-col justify-center text-[16px] leading-nomal font-medium">
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>주거전용면적</li>
              <li>84.87m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>주거공용면적</li>
              <li>26.45m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>공용면적</li>
              <li>111.33m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>기타공용면적</li>
              <li>51.79m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>계약면적</li>
              <li>163.12m²</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-[80px] py-8">
        <p className="w-[88px] h-12 flex justify-center items-center text-white text-[20px] rounded-lg bg-gray_800 font-medium">
          157m²
        </p>
        <div className="pb-8 flex gap-8">
          <Image src={Image14} alt="집 구조" width={410} height={410} />
          <div className="w-[406px] p-8 flex flex-col justify-center text-[16px] leading-nomal font-medium">
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>주거전용면적</li>
              <li>84.87m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>주거공용면적</li>
              <li>26.45m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>공용면적</li>
              <li>111.33m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>기타공용면적</li>
              <li>51.79m²</li>
            </ul>
            <ul className="flex w-[320px] mx-auto py-4 border-b border-gray_600 justify-between">
              <li>계약면적</li>
              <li>163.12m²</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-black_100 border rounded-[5px] h-[200px] mx-[49px] flex gap-[96px] justify-center py-10">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              1
            </p>
            <p>소화기</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              5
            </p>
            <p>자동식소화기</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              9
            </p>
            <p>리모콘스위치</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              13
            </p>
            <p>환기제어스위치</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              2
            </p>
            <p>급수계량기</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              6
            </p>
            <p>난방분배기(싱크대하부)</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              10
            </p>
            <p>비디오폰</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              3
            </p>
            <p>가스누설차단기</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              7
            </p>
            <p>난방온도조절기</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              11
            </p>
            <p>도어폰</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              4
            </p>
            <p>랜치후드</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              8
            </p>
            <p>세대분전반</p>
          </div>
          <div className="flex gap-2">
            <p className="w-6 h-6 bg-black_100 rounded-full text-white text-center">
              12
            </p>
            <p>세대스피커</p>
          </div>
        </div>
      </div>
    </div>
  );
}
