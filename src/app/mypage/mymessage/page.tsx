"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  createdAt: string;
}

export default function MyMessagePage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Notification[]>([]);

  const fetchMessage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/members/notification`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setMessages(response.data.result.result.notificationList);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchMessage();
    }
  }, [session]);

  return (
    <div className="w-[680px] mx-auto">
      {messages.map((message) => (
        <div key={message.id}>
          <div className="h-12 bg-[#FBFBFB] flex items-center pl-4">
            {message.createdAt}
          </div>
          <div className="h-10 flex items-center pl-4 gap-4 border-b-2">
            {message.createdAt}
            <span>{message.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
