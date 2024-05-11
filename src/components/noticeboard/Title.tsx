const Title = () => {
  return (
    <div className="w-full flex justify-between items-center mb-[30px]">
      <div className="w-[510px] h-[50px] text-[42px] font-[600] leading-[50.12px]">
      소통공간
      </div>
      <div className="">
        <input type="text" placeholder="검색어를 입력하세요" 
        className="w-[428px] h-[50px] rounded-[5px] py-[15px] px-[30px] bg-[#FCFCFC]  border border-solid border-[#EAEAEA];
        ]" />
      </div>
    </div>
  )
}

export default Title