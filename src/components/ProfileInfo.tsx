'use client';

import { ProfileCollections, CounterBox, UserAvatar } from '@/components';
import { getUserAssets, getUserData } from '@/services';
import { GetCanvasData, UserDetails } from '@/types';
import { useEffect, useState, FC } from 'react';
import { Skeleton } from '@/ui/Skeleton';
import { PROFILE_TABS } from '@/data';
import { Button } from '@/ui';

interface ProfileInfoProps {
  profileHandle: string;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ profileHandle }) => {
  const [canvasData, setCanvasData] = useState<GetCanvasData | any>(null);
  const [userData, setUserData] = useState<UserDetails | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        if (data) {
          const canvasData = await getUserAssets();
          setCanvasData(canvasData);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchingData();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between space-y-4 rounded-[30px] border-2 border-[#375DFB] p-4 lg:flex-row lg:space-y-0 lg:p-8">
        <div className="flex items-center space-x-5 truncate lg:w-full lg:space-x-10">
          <UserAvatar color="blue" isVerified size="xl" />
          <div className="flex flex-col space-y-1 lg:space-y-2">
            <p className="bg-gradient-to-r from-[#2C1146] to-[#2D356C] bg-clip-text text-2xl font-bold lowercase text-transparent lg:text-5xl">
              {profileHandle.length === 42 && profileHandle.startsWith('0x')
                ? `${profileHandle.slice(0, 4)}..${profileHandle.slice(-4)}`
                : profileHandle}
            </p>
            <p className="blue-base text-xl font-semibold lg:text-4xl">
              imPOSTER
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4 space-y-0 lg:flex-col lg:items-end lg:space-x-0">
          {/* Additional buttons or links */}
          <p className="text-md font-bold">TIME TO CLAIM: 12 HR 30 MIN</p>
          <p className="text-md font-bold">BALANCE:108</p>
          <Button
            className="
              md:py-15 flex h-16 
              w-40 items-center justify-center
              rounded-[22px] border-none bg-[#375DFB]
              px-4 py-3 text-[20px] 
              font-semibold 
              leading-6 text-white
              shadow-lg transition 
              hover:bg-[#375DFB]/80 sm:h-20
              sm:w-64 sm:px-6
              sm:py-5 sm:text-[22px]
              md:h-[82px] md:w-[257px] 
              md:px-10 md:text-[28px]
            "
          >
            Claim! Tokens
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-5 py-4 lg:flex-row lg:space-x-10 lg:space-y-0 lg:py-10">
        <CounterBox
          count={
            isLoading ? (
              <Skeleton className="lg: h-[30px] w-[60px] rounded-full lg:h-[40px] lg:w-[100px]" />
            ) : (
              userData?.balance?.toString() || ''
            )
          }
          percentage="23.8"
          title="$POSTER"
          week="this"
        />
        <CounterBox
          count={
            isLoading ? (
              <Skeleton className="lg: h-[30px] w-[60px] rounded-full lg:h-[40px] lg:w-[100px]" />
            ) : canvasData?.totalPage ? (
              (canvasData.totalPage * 10).toString()
            ) : (
              ''
            )
          }
          percentage="23"
          gifts={false}
          title="Posts"
          week="this"
        />
      </div>
      <ProfileCollections isProfilePage={true} tabs={PROFILE_TABS} />
    </>
  );
};

export default ProfileInfo;
