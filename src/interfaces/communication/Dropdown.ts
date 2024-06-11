import { UseFormSetValue } from 'react-hook-form';

interface Option {
  label: string;
}

export interface DropdownProps {
  options: Option[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setValue: UseFormSetValue<FormData>;
}

interface FormData {
  categoryCode: string;
  title: string;
  content: string;
}