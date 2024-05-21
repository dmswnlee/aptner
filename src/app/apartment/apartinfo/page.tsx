import Image from "next/image";
export default function ApartInfoPage() {
  return (
    <div className="w-[864px] mx-auto">
      <div className="flex gap-4 text-center">
        <div>
          <Image
            src="/"
            alt="집 주변"
            width={424}
            height={214}
            className="border-2 mb-4"
          />
          <p className="mb-[34px]">잠원스포츠파크가 걸어서 7분거리 입니다.</p>
        </div>
        <div>
          <Image
            src="/"
            alt="집 주변"
            width={424}
            height={214}
            className="border-2 mb-4"
          />
          <p className="mb-[60px]">
            신동초, 반월초, 경원중이 걸어서 10분거리 입니다.
          </p>
        </div>
      </div>

      <div className="flex gap-4 text-center">
        <div className="mb-[34px]">
          <Image
            src="/"
            alt="집 주변"
            width={424}
            height={214}
            className="border-2 mb-4"
          />
          <p>잠원역이 걸어서 10분거리 입니다.</p>
        </div>
        <div className="mb-[34px]">
          <Image
            src="/"
            alt="집 주변"
            width={424}
            height={214}
            className="border-2 mb-4"
          />
          <p>한강공원까지 걸어서 10분거리 입니다.</p>
        </div>
      </div>
    </div>
  );
}
