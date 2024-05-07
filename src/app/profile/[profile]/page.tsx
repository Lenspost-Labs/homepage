'use client';

import ProfileInfo from '@/components/ProfileInfo';
import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import Cookies from 'js-cookie';

import { GetCanvasData, UserDetails } from '../../../types/types';
interface PageProps {
  params: { profile: string };
}

const metadata: Metadata = {
  title: 'Profile'
};

const Profile = ({ params }: PageProps) => {
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
        canvasData={canvasData}
        isLoading={isLoading}
        userData={userData}
      />
    </div>
  );
};

export default Profile;
