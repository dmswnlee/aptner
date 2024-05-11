import Posts from "@/components/noticeboard/Posts";
import Tabs from "@/components/noticeboard/Tabs";
import Title from "@/components/noticeboard/Title";

const CommunicationPage = () => {

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1080px] mt-[180px] mb-10">
        <Title />
        <Tabs />
        <Posts />
      </div>
    </div>
  );
};

export default CommunicationPage;
