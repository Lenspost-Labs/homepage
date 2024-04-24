'use client';
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { PiButterflyFill } from "react-icons/pi";
import ProfileCollections from "@/components/collections/ProfileCollections";
import CounterBox from "@/components/CounterBox";
import { GetCanvasData, UserDetails } from "../../../../types/types";
import Cookies from "js-cookie";
import { Metadata } from "next";

interface PageProps {
  params: { profile: string };
}

const metadata: Metadata = { 
  title: "Profile",
};

function Profile({ params }: PageProps) {
  const { profile } = params;
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [canvasData, setCanvasData] = useState<GetCanvasData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = Cookies.get('jwt') || "";

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/user/`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!res.ok) {
          console.log('Failed to fetch user data');
        }

        const userData: UserDetails = await res.json();
        setUserData(userData);

        const canvasRes = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/user/canvas?ThVu_MmMwR`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!canvasRes.ok) {
          console.log('Failed to fetch canvas data');
        }

        const canvasData: GetCanvasData = await canvasRes.json();
        setCanvasData(canvasData);
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col pt-28 lg:pt-36 pb-5 lg:pb-20 items-center px-5 lg:px-20">
      <ProfileInfo profileHandle={profile} userData={userData} canvasData={canvasData} isLoading={isLoading} />
    </div>
  );
}

interface ProfileInfoProps {
  profileHandle: string;
  userData: UserDetails | null;
  canvasData: GetCanvasData | null;
  isLoading: boolean;
}

const ProfileInfo = ({ profileHandle, userData, canvasData, isLoading }: ProfileInfoProps) => {
  const CANVAS_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/user/canvas`;
  const profileTabs = ['Remix ', 'Collections '];

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row lg:space-y-0 space-y-4 items-center justify-between border border-theme-light-purple rounded-[30px] p-4 lg:p-8">
        <div className="flex lg:w-full items-center space-x-5 truncate lg:space-x-10">
          <UserAvatar isVerified size="xl" />
          <div className="flex flex-col space-y-1 lg:space-y-2">
            <p className="text-2xl lg:text-5xl font-bold lowercase">
              {profileHandle.length === 42 && profileHandle.startsWith('0x')
                ? `${profileHandle.slice(0, 4)}..${profileHandle.slice(-4)}`
                : profileHandle}
            </p>
            <p className="text-xl lg:text-4xl font-semibold text-theme-light-purple">
              imPOSTER
            </p>
          </div>
        </div>
        <div className="flex items-center lg:items-end flex-row lg:flex-col space-x-4 lg:space-x-0 space-y-0 lg:space-y-10">
          {/* Additional buttons or links */}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-10 py-4 lg:py-10">
      <CounterBox
        title="POSTER Tokens"
        count={isLoading ? '\u00A0' : userData?.message.balance?.toString() || ''}
        percentage="23.8"
        week="this"
      />
     <CounterBox
        title="Posts"
        count={isLoading ? '\u00A0' : canvasData?.totalPages ? (canvasData.totalPages * 10).toString() : ''}
        percentage="23"
        week="this"
      />
      </div>
      <ProfileCollections tabs={profileTabs} />
    </>
  );
};

export default Profile;