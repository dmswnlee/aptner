'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Posts from "./_component/Post";
import Gallery from "./_component/Gallery";
import GalleryTab from "./_component/GalleryTab";
import { RiListUnordered, RiGalleryFill } from "react-icons/ri";

interface Writer {
  id: number;
  name: string;
  nickname: string;
}
interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}
interface Communication {
  id: number;
  category: Category;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  title: string;
  viewCount: number;
  status: string;
}
interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

export default function ComplaintPage() {
  const [activeTab, setActiveTab] = useState<string>("Posts");
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  
  const tabs = [
    { name: "Posts", icon: <RiListUnordered /> },
    { name: "Gallery", icon: <RiGalleryFill /> }
  ];

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const fetchCommunications = async () => {
    if (!session) return;
    try {
      const response = await axios.get(`https://aptner.site/v1/api/posts/RO000`, {
        headers: {
          Authorization: `Bearer ${(session as SessionData).accessToken}`,
        },
        params: {
          page: 1,
          size: 15,
          sort: "LATEST",
        },
      });
      setCommunications(response.data.result.result.posts);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchCommunications();
    }
  }, [session]);

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">
        소통게시판
      </p>
      <GalleryTab tabs={tabs} onTabChange={handleTabChange} />
      <div className="w-[1080px] mx-auto">
        {activeTab === "Posts" ? (
          <Posts />
        ) : (
          <Gallery data={communications} detailPath="/communication/details" loading={loading} />
        )}
      </div>
    </div>
  );
}
