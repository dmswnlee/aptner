export interface SizeSelectionProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  sizes: {
    id: number;
    area: number;
    imagePath: string;
  }[];
}

export interface SizeDetails {
  residentialArea: string;
  residentialCommon: string;
  supply: string;
  otherCommon: string;
  contract: string;
}