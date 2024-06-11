export interface SizeDetailsDisplayProps {
  selectedSize: string;
  setSelectedSize?: (size: string) => void; 
  sizes: {
    id: number;
    area: number;
    imagePath: string;
  }[];
  readOnly?: boolean; 
}

export interface SizeDetails {
  residentialArea: string;
  residentialCommon: string;
  supply: string;
  otherCommon: string;
  contract: string;
}