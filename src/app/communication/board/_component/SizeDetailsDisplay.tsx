import React from 'react';

interface SizeDetailsDisplayProps {
  selectedSize: string;
  setSelectedSize?: (size: string) => void; // Make optional
  sizes: {
    id: number;
    area: number;
    imagePath: string;
  }[];
  readOnly?: boolean; // New prop to control read-only mode
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

const SizeDetailsDisplay = ({ selectedSize, setSelectedSize, sizes, readOnly = false }: SizeDetailsDisplayProps) => {
  const selectedSizeInfo = sizes.find((size) => size.id.toString() === selectedSize);
  const details = selectedSizeInfo ? sizeDetails[selectedSizeInfo.id] : null;

  return (
    <div className="border rounded-[5px] p-4 mt-4 max-w-[600px] min-h-[280px] bg-[#F9F9F9]">
      {!readOnly && (
        <div className="flex gap-2 mb-3">
          {sizes.map((size) => (
            <button
              type="button"
              key={size.id}
              className={`px-3 py-2 rounded-lg ${selectedSize === size.id.toString() ? 'bg-[#EBF7FF] text-[#0B8EDB]' : 'bg-[#EEEEEE] text-[#777777]'}`}
              onClick={() => {
                if (setSelectedSize) {
                  setSelectedSize(size.id.toString());
                }
              }}
            >
              {size.area}평
            </button>
          ))}
        </div>
      )}
      {selectedSizeInfo && details && (
        <div className="flex flex-col items-start">
          <div className={`px-3 py-2 rounded-lg bg-[#EBF7FF] text-[#0B8EDB] mb-3`}>
            {selectedSizeInfo.area}평
          </div>
          <div className="flex justify-between w-full h-">
            <img src={selectedSizeInfo.imagePath} alt={`${selectedSizeInfo.area}평 이미지`} className="w-[200px] h-[200px]" />
            <div className="p-3 w-full h-[200px] ml-3">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">주거전용면적</span>
                <span className="text-sm">{details.residentialArea}</span>
              </div>
              <hr className="my-[10px] border-gray-300" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">주거공용면적</span>
                <span className="text-sm">{details.residentialCommon}</span>
              </div>
              <hr className="my-[10px] border-gray-300" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">공급면적</span>
                <span className="text-sm">{details.supply}</span>
              </div>
              <hr className="my-[10px] border-gray-300" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">기타공용면적</span>
                <span className="text-sm">{details.otherCommon}</span>
              </div>
              <hr className="my-[10px] border-gray-300" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">계약면적</span>
                <span className="text-sm">{details.contract}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SizeDetailsDisplay;
