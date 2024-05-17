'use client';

import { ProfileCollections, CounterBox, UserAvatar } from '@/components';
import { getUserAssets, getUserData } from '@/services';
import { GetCanvasData, UserDetails } from '@/types';
import { useEffect, useState, FC } from 'react';
import { Skeleton } from '@/ui/Skeleton';
import { PROFILE_TABS } from '@/data';
import Cookies from 'js-cookie';
import { Button } from '@/ui';

interface ProfileInfoProps {
  profileHandle: string;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ profileHandle }) => {
  const [canvasData, setCanvasData] = useState<GetCanvasData | any>(null);
  const [userData, setUserData] = useState<UserDetails | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timer, setTimer] = useState<string>('');
  const [isButtonClicked, setIsButtonClicked] = useState<boolean | null>(null);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

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

  useEffect(() => {
    const checkButtonState = () => {
      const buttonState = Cookies.get('isButtonClicked') === 'true';
      setIsButtonClicked(buttonState);
      if (buttonState) {
        calculateAndStartTimer();
      }
    };

    const timer = setTimeout(() => {
      checkButtonState();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const calculateAndStartTimer = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const sundayDiff = (7 - currentDay) % 7;
    const wednesdayDiff = (3 - currentDay + 7) % 7;

    const nearestDiff =
      sundayDiff <= wednesdayDiff ? sundayDiff : wednesdayDiff;
    const nearestDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + nearestDiff,
      0,
      0,
      0
    );

    startTimer(nearestDate.getTime());
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    Cookies.set('isButtonClicked', 'true');
    calculateAndStartTimer();
  };

  const startTimer = (targetTime: number) => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const timeDiff = targetTime - now;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (timeDiff <= 0) {
        clearInterval(timerInterval!);
        setIsButtonClicked(false);
        setTimer('');
        Cookies.remove('isButtonClicked');
      } else {
        setTimer(`${hours} HR ${minutes} MIN`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    setTimerInterval(interval);
  };

  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

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
        <div className="flex flex-col items-center space-y-4">
          {isButtonClicked === null ? (
            <Skeleton className="h-6 w-48 rounded-full" />
          ) : (
            isButtonClicked && (
              <p className="text-md font-bold">Next Claim in: {timer}</p>
            )
          )}
          {isButtonClicked === null ? (
            <Skeleton className="h-16 w-40 rounded-full sm:h-20 sm:w-64 md:h-[82px] md:w-[257px]" />
          ) : (
            <Button
              className={`md:py-15 flex h-16 w-40 items-center justify-center whitespace-nowrap rounded-[22px] border-none px-4 py-3 text-[20px] font-semibold leading-6 shadow-lg transition hover:bg-[#375DFB]/80 sm:h-20 sm:w-64 sm:px-6 sm:py-5 sm:text-[22px] md:h-[82px] md:w-[257px] md:px-10 md:text-[28px] ${
                isButtonClicked
                  ? 'bg-[#C2D6FF] text-white hover:bg-[#C2D6FF]'
                  : 'bg-[#375DFB] text-white'
              }`}
              onClick={handleButtonClick}
              disabled={isButtonClicked}
            >
              {isButtonClicked ? `Tokens Claimed!` : 'Claim Tokens'}
            </Button>
          )}
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
