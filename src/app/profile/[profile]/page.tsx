import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import React from "react";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { PiButterflyFill } from "react-icons/pi";
import ProfileCollections from "@/components/collections/ProfileCollections";
import CounterBox from "@/components/CounterBox";
import { GetCanvasData, UserDetails } from "../../../../types/types";
import { cookies } from 'next/headers';
import { Metadata } from "next";

interface PageProps {
  params: { profile: string };
}

export const metadata: Metadata = { 
  title: "Profile",
};

async function Profile({ params }: PageProps) {
  const { profile } = params;
 
  const jwtToken = cookies().get('jwt')?.value || "";

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

    const canvasRes = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/user/canvas?ThVu_MmMwR`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!canvasRes.ok) {
      console.log('Failed to fetch canvas data');
    }

    const canvasData: GetCanvasData = await canvasRes.json();

    return (
      <>
        <div className="flex flex-col pt-28 lg:pt-36 pb-5 lg:pb-20 items-center px-5 lg:px-20">
          <ProfileInfo profileHandle={profile} userData={userData} canvasData={canvasData} />
        </div>
      </>
    );
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    return (
      <>
        <div>Error: {error.message}</div>
      </>
    );
  }
}

interface ProfileInfoProps {
  profileHandle: string;
  userData: UserDetails;
  canvasData: GetCanvasData;

}

const ProfileInfo = ({ profileHandle ,userData,canvasData  }: ProfileInfoProps) => {
  const CANVAS_API_URL= `${process.env.NEXT_PUBLIC_DEV_URL}/user/canvas?ThVu_MmMwR`
  const profileTabs = ['NFTs ', 'Templates '];
  return (
    <>
      <div className="flex w-full flex-col lg:flex-row lg:space-y-0 space-y-4 items-center justify-between border border-theme-light-purple rounded-[30px] p-4 lg:p-8">
        <div className="flex lg:w-full items-center space-x-5 truncate lg:space-x-10">
          <UserAvatar isVerified size="xl" />
          <div className="flex flex-col space-y-1 lg:space-y-2">
            <p className="text-2xl lg:text-5xl font-bold lowercase">
              @{profileHandle}
            </p>
            <p className="text-xl lg:text-4xl font-semibold text-theme-light-purple">
              Pro Memoor
            </p>
          </div>
        </div>
        <div className="flex items-center lg:items-end flex-row lg:flex-col space-x-4 lg:space-x-0 space-y-0 lg:space-y-10">
          <button>
            <FaCog size={40} className="cursor-pointer" />
          </button>
          <div className="flex flex-row items-center space-x-4">
            <Link href="https://bsky.app/">
              <PiButterflyFill size={40} className="cursor-pointer" />
            </Link>
            <Link href="https://discord.com/">
              <FaDiscord size={40} className="cursor-pointer" />
            </Link>
            <Link href="https://x.com/">
              <FaXTwitter size={30} className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-10 py-4 lg:py-10">
        <CounterBox
          title="POSTER Tokens"
          count={userData?.message.balance?.toString() || ''}
          percentage="23.8"
          week="this"
        />
        <CounterBox title="Posts" count={(canvasData?.totalPages * 10).toString() || ''} percentage="23" week="this" />
      </div>
      <ProfileCollections tabs={profileTabs}  />
    </>
  );
};

export default Profile;
