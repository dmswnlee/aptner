import React from 'react';

interface SizeSelectionProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  sizes: {
    id: number;
    area: number;
    imagePath: string;
  }[];
}

interface SizeDetails {
  residentialArea: string;
  residentialCommon: string;
  supply: string;
  otherCommon: string;
  contract: string;
}

const sizeDetails: { [key: number]: SizeDetails } = {
  1: {
    residentialArea: '84.86m²',
    residentialCommon: '26.06m²',
    supply: '110.92m²',
    otherCommon: '51.78m²',
    contract: '162.71m²'
  },
  2: {
    residentialArea: '84.87m²',
    residentialCommon: '26.45m²',
    supply: '111.33m²',
    otherCommon: '51.79m²',
    contract: '163.12m²'
  },
  3: {
    residentialArea: '157.34m²',
    residentialCommon: '49.04m²',
    supply: '206.39m²',
    otherCommon: '96.01m²',
    contract: '302.41m²'
  }
};

function SizeSelection({ selectedSize, setSelectedSize, sizes }: SizeSelectionProps) {
  const selectedSizeInfo = sizes.find((size) => size.id.toString() === selectedSize);
  const details = selectedSizeInfo ? sizeDetails[selectedSizeInfo.id] : null;

  return (
    <div className="border rounded-[5px] p-5 mt-4 max-w-[717px] min-h-[392px] bg-[#F9F9F9]">
      <p className="mb-3 text-[16px] font-semibold leading-[18px]">평형선택</p>
      <div className="flex gap-4 mb-4">
        {sizes.map((size) => (
          <button
            type="button" 
            key={size.id}
            className={`px-4 py-2 rounded-lg ${selectedSize === size.id.toString() ? 'bg-[#EBF7FF] text-[#0B8EDB]' : 'bg-[#EEEEEE] text-[#777777]'}`}
            onClick={() => {
              console.log(`Size selected: ${size.area}평`);
              setSelectedSize(size.id.toString());
            }}
          >
            {size.area}평
          </button>
        ))}
      </div>
      {selectedSizeInfo && details && ( 
        <div className="flex justify-between">
          <img src={selectedSizeInfo.imagePath} alt={`${selectedSizeInfo.area}평 이미지`} className="w-[280px] h-[280px]" />
          <div className="p-[35px] w-[405px] h-[280px]">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">주거전용면적</span>
              <span>{details.residentialArea}</span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between mb-2">
              <span className="font-semibold">주거공용면적</span>
              <span>{details.residentialCommon}</span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between mb-2">
              <span className="font-semibold">공급면적</span>
              <span>{details.supply}</span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between mb-2">
              <span className="font-semibold">기타공용면적</span>
              <span>{details.otherCommon}</span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between mb-2">
              <span className="font-semibold">계약면적</span>
              <span>{details.contract}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SizeSelection;
