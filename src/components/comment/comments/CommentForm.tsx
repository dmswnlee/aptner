import React, { useEffect, useState } from 'react';
import CommentTextarea from './CommentTextarea';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import User from "@/assets/images/emoji/user.png";

interface CommentFormProps {
  author: string;
  newComment: string;
  charCount: number;
  image: File | null;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAddComment: (parentId?: number | null, content?: string, image?: File | null) => void;
  isEditing: boolean;
  parentId?: number;
  prefix?: string;
}

const CommentForm = (props: CommentFormProps) => {
  const {
    author,
    newComment,
    charCount,
    image,
    onTextareaChange,
    onFileChange,
    onRemoveImage,
    onAddComment,
    isEditing,
    parentId,
    prefix
  } = props;
  const { data: session, status } = useSession();

  interface Profile {
    profileImage: string;
    nickname: string;
  }
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      handleProfile();
    }
  }, [status]);

  const handleProfile = async () => {
    try {
      const response = await axios.get(
        "https://aptner.site/v1/api/members/RO000/my-pages/profile",
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log(response.data);
      setProfile(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const profileImage = profile?.profileImage;
  
  return (
    <div>
      <div className="flex items-center gap-3 p-2 rounded-[5px] mt-5">
        <img
          // src={profileImage || User.src}
          src={User.src}
          alt="user"
          className="flex rounded-full w-10 h-10 object-cover border cursor-pointer "
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <p>{author}</p>
          </div>
        </div>
      </div>
      <CommentTextarea
        value={newComment}
        charCount={charCount}
        image={image}
        onTextareaChange={onTextareaChange}
        onFileChange={onFileChange}
        onRemoveImage={onRemoveImage}
        onSave={() => onAddComment(parentId, newComment, image)}
        prefix={prefix}
        isEditing={isEditing}
      />
    </div>
  );
};

export default CommentForm;
