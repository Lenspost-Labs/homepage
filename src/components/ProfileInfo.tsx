// ProfileInfo.tsx
import { GetCanvasData, UserDetails } from '@/types/types';
import UserAvatar from '@/components/UserAvatar';
import CounterBox from '@/components/CounterBox';
import { PROFILE_TABS } from '@/data';
import React from 'react';

import ProfileCollections from './collections/ProfileCollections';

interface ProfileInfoProps {
  canvasData: GetCanvasData | null;
  userData: UserDetails | null;
  profileHandle: string;
  isLoading: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profileHandle,
  canvasData,
  isLoading,
  userData
}: ProfileInfoProps) => {
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
          count={
            isLoading ? '\u00A0' : userData?.message.balance?.toString() || ''
          }
          title="POSTER Tokens"
          percentage="23.8"
          week="this"
        />
        <CounterBox
          count={
            isLoading
              ? '\u00A0'
              : canvasData?.totalPages
                ? (canvasData.totalPages * 10).toString()
                : ''
          }
          percentage="23"
          title="Posts"
          week="this"
        />
      </div>
      <ProfileCollections tabs={PROFILE_TABS} />
    </>
  );
};

export default ProfileInfo;
