'use client';
import UserAvatar from '@/components/UserAvatar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaXTwitter, FaDiscord } from 'react-icons/fa6';
import { FaCog } from 'react-icons/fa';
import { PiButterflyFill } from 'react-icons/pi';
import ProfileCollections from '@/components/collections/ProfileCollections';
import CounterBox from '@/components/CounterBox';
import { GetCanvasData, UserDetails } from '../../../types/types';
import Cookies from 'js-cookie';
import { Metadata } from 'next';

interface PageProps {
  params: { profile: string };
}

const metadata: Metadata = {
  title: 'Profile'
};

function Profile({ params }: PageProps) {
  const { profile } = params;
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [canvasData, setCanvasData] = useState<GetCanvasData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = Cookies.get('jwt') || '';

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/user/`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });

        if (!res.ok) {
          console.log('Failed to fetch user data');
        }

        const userData: UserDetails = await res.json();
        setUserData(userData);

        const canvasRes = await fetch(
          `${process.env.NEXT_PUBLIC_DEV_URL}/user/canvas?ThVu_MmMwR`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          }
        );

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
    <div className="flex flex-col items-center px-5 pb-5 pt-28 lg:px-20 lg:pb-20 lg:pt-36">
      <ProfileInfo
        profileHandle={profile}
        userData={userData}
        canvasData={canvasData}
        isLoading={isLoading}
      />
    </div>
  );
}

interface ProfileInfoProps {
  profileHandle: string;
  userData: UserDetails | null;
  canvasData: GetCanvasData | null;
  isLoading: boolean;
}

const ProfileInfo = ({
  profileHandle,
  userData,
  canvasData,
  isLoading
}: ProfileInfoProps) => {
  const CANVAS_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/user/canvas`;

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between space-y-4 rounded-[30px] border-2 border-[#E1F36D] p-4 lg:flex-row lg:space-y-0 lg:p-8">
        <div className="flex items-center space-x-5 truncate lg:w-full lg:space-x-10">
          <UserAvatar isVerified size="xl" />
          <div className="flex flex-col space-y-1 lg:space-y-2">
            <p className="bg-gradient-to-r from-[#2C1146] to-[#2D356C] bg-clip-text text-2xl font-bold lowercase text-transparent lg:text-5xl">
              {profileHandle.length === 42 && profileHandle.startsWith('0x')
                ? `${profileHandle.slice(0, 4)}..${profileHandle.slice(-4)}`
                : profileHandle}
            </p>
            <p className="text-xl font-semibold text-[rgba(45,34,88,0.56)] lg:text-4xl">
              imPOSTER
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4 space-y-0 lg:flex-col lg:items-end lg:space-x-0 lg:space-y-10">
          {/* Additional buttons or links */}
        </div>
      </div>
      <div className="flex w-full flex-col space-y-5 py-4 lg:flex-row lg:space-x-10 lg:space-y-0 lg:py-10">
        <CounterBox
          title="POSTER Tokens"
          count={
            isLoading ? '\u00A0' : userData?.message.balance?.toString() || ''
          }
          percentage="23.8"
          week="this"
        />
        <CounterBox
          title="Posts"
          count={
            isLoading
              ? '\u00A0'
              : canvasData?.totalPages
                ? (canvasData.totalPages * 10).toString()
                : ''
          }
          percentage="23"
          week="this"
        />
      </div>
      <ProfileCollections tabs={profileTabs} />
    </>
  );
};

export default Profile;
