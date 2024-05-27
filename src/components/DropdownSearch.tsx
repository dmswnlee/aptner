import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setOption } from "@/stores/slice/communicationsSlice";
import { RootState } from "@/stores/store";

interface Option {
  value: string;
  label: string;
}

interface DropdownSearchProps {
  onSelect: (selectedOption: Option) => void;
  selectedOption: Option;
}

const DropdownSearch = ({ onSelect, selectedOption }: DropdownSearchProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const option = useSelector((state: RootState) => state.communications.option); // Redux 상태에서 현재 옵션을 가져옴

  // 검색 옵션 리스트
  const searchOptions: Option[] = [
    { value: "title_content", label: "제목 + 내용" },
    { value: "title", label: "제목" },
    { value: "content", label: "내용" },
    { value: "author", label: "작성자" },
  ];

  // 컴포넌트가 마운트되거나 option 값이 변경될 때마다 실행
  useEffect(() => {
    const currentOption = searchOptions.find(opt => opt.value === option);
    if (currentOption) {
      setCurrentOptionLabel(currentOption.label);
    }
  }, [option]);

  const [currentOptionLabel, setCurrentOptionLabel] = useState("검색 조건");

  // 드롭다운 토글 핸들러
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 옵션 선택 핸들러
  const handleOptionSelect = (option: Option) => {
    setCurrentOptionLabel(option.label);
    onSelect(option); // 부모 컴포넌트에 선택된 옵션 전달
    dispatch(setOption(option.value)); // Redux 상태 업데이트
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center text-[15px] h-[38px] w-[128px] pl-3 pr-3 rounded-md border ${isDropdownOpen ? 'border-gray-400' : 'border-gray-400'} border-solid text-gray-700 focus:outline-none focus:bg-gray-100`}
        onClick={toggleDropdown}
      >
        <span className="flex-1 text-left ml-2">{currentOptionLabel}</span>
        <FaAngleDown className="ml-auto" />
      </button>
      <div
        className={`absolute top-full left-0 w-full bg-white border-gray-400 border border-solid border-t-0 rounded-b-md shadow-md transition-all duration-300 overflow-hidden ${
          isDropdownOpen ? "max-h-[250px]" : "max-h-0 border-0"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        <ul>
          {searchOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className="cursor-pointer px-5 py-2 hover:bg-gray-100 text-[15px]"
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownSearch;
