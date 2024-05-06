'use client';

import { useSignMessage, useDisconnect, useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { IoGiftOutline } from 'react-icons/io5';
import { LinkButton } from '@/ui';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MenuIcon, X } from 'lucide-react';
import { useToast } from '@/ui/use-toast';
import { UserAvatar } from '@/components';
import { LENSPOST_APP_URL } from '@/data';
import { FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { cn } from '@/utils';
import axios from 'axios';

import { AuthEvmResponse, UserDetails } from '../../../types/types';
import MobileMenu from './MobileMenu';

interface Props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  showMenu: boolean;
  isLight: boolean;
}

function UserMenu({ isLight = true, setShowMenu, showMenu }: Props) {
  const [posterToken, setPosterToken] = useState<number | null>(null);

  const { isDisconnected, isConnected, address } = useAccount();
  const { signMessage, isSuccess, isError, error, data } = useSignMessage();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const router = useRouter();

  async function getSignature() {
    if (isDisconnected) return;
    const message = 'This message is to login you into lenspost dapp.';

    const result = signMessage({ message });
  }

  useEffect(() => {
    const clearCookies = () => {
      const jwtToken = Cookies.get('jwt');
      if (jwtToken === undefined) return;
      const jwtExpiration = 24 * 60 * 60 * 1000;
      const jwtTimestamp = Cookies.get('jwtTimestamp');
      const currentTimestamp = new Date().getTime();
      if (
        jwtTimestamp &&
        currentTimestamp - parseInt(jwtTimestamp, 10) > jwtExpiration
      ) {
        Cookies.remove('jwt');
        Cookies.remove('userId');
        Cookies.remove('username');
        Cookies.remove('jwtTimestamp');
        toast({
          description:
            'Your session has expired. Please connect your wallet again',
          title: 'Session Expired',
          variant: 'destructive'
        });
      }
    };

    const interval = setInterval(clearCookies, 15 * 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (isConnected && address) {
      getSignature();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  const handleProfileClick = () => {
    const username = Cookies.get('username');
    if (username) {
      router.push(`/profile/${username}`);
    }
  };

  useEffect(() => {
    if (isError && error?.name === 'UserRejectedRequestError') {
      toast({
        description: 'You have rejected the login request.',
        title: 'Login Failed ❌',
        variant: 'destructive'
      });

      disconnect();
    }
  }, [isError]);

  const sendSignatureToBackend = async () => {
    try {
      const body = {
        message: 'This message is to login you into lenspost dapp.',
        evm_address: address,
        signature: data
      };

      const response = await axios.post<AuthEvmResponse>(
        `${process.env.NEXT_PUBLIC_DEV_URL}/auth/evm`,
        body,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      toast({
        description: 'You have successfully logged in.',
        title: 'Login Successfull ✅'
      });
      Cookies.set('jwt', response.data.jwt, { expires: 1 });
      Cookies.set('userId', response.data.userId, { expires: 1 });
      const currentTimestamp = new Date().getTime();
      Cookies.set('jwtTimestamp', currentTimestamp.toString(), { expires: 1 });

      if (response.data.username === '') {
        Cookies.set('username', address, { expires: 1 });
      } else {
        Cookies.set('username', response.data.username, { expires: 1 });
      }
    } catch (error) {
      toast({
        description: 'An error occurred while logging in.',
        variant: 'destructive',
        title: 'Error ❌'
      });
    }
  };

  useEffect(() => {
    const fetchPosterToken = async () => {
      if (isConnected && address) {
        try {
          const jwtToken = Cookies.get('jwt');
          const res = await axios.get<UserDetails>(
            `${process.env.NEXT_PUBLIC_DEV_URL}/user/`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`
              }
            }
          );

          if (res.data) {
            const userData = await res.data;
            setPosterToken(userData?.message.balance || null);
          } else {
            console.log('No data found');
          }
        } catch (error) {
          console.log('No data found');
        }
      }
    };

    fetchPosterToken();
  }, [isConnected, address]);

  useEffect(() => {
    if (isConnected && address && data) {
      sendSignatureToBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, data]);
  const jwtToken = Cookies.get('jwt');

  return (
    <>
      <div className="flex flex-row items-center justify-end space-x-4 lg:space-x-6">
        <LinkButton
          className="!hidden !p-2 lg:!flex lg:!px-4 lg:!py-[8px]"
          icon={<FaPlus className="h-6 w-6 lg:h-4 lg:w-4" />}
          variant={isLight ? 'invert' : 'green'}
          href={LENSPOST_APP_URL}
          outline={true}
        >
          <span className="hidden text-xl font-semibold lg:block">Create</span>
        </LinkButton>
        {jwtToken === undefined ? (
          <div className="group">
            <UserAvatar onClick={openConnectModal} isVerified />
          </div>
        ) : (
          <div className="group">
            <UserAvatar onClick={handleProfileClick} isVerified />
          </div>
        )}
        <div className="relative z-40 block lg:hidden">
          <button
            className={cn('rounded-full border p-2', {
              'border-theme-light-purple': !isLight,
              'border-white': isLight
            })}
            onClick={() => setShowMenu(!showMenu)}
          >
            {!showMenu ? (
              <MenuIcon
                className={cn({
                  'text-theme-light-purple': !isLight,
                  'text-white': isLight
                })}
                size={24}
              />
            ) : (
              <X
                className={cn({
                  'text-theme-light-purple': !isLight,
                  'text-white': isLight
                })}
                size={24}
              />
            )}
          </button>
        </div>
        <LinkButton
          variant={isLight ? 'invert' : 'green'}
          icon={<IoGiftOutline size={24} />}
          className="hidden lg:flex"
          outline={true}
          href="/"
        >
          <span className="text-xl font-semibold">{posterToken || '0'}</span>
        </LinkButton>
      </div>
      {showMenu && <MobileMenu setShow={setShowMenu} show={showMenu} />}
    </>
  );
}

export default UserMenu;
