import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Profile {
  profileImage: string;
  nickname: string;
}

interface ProfileContextProps {
  profile: Profile | null;
}

const ProfileContext = createContext<ProfileContextProps>({ profile: null });

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/members/RO000/my-pages/profile`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setProfile(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
