'use client';

import { useSignMessage, useDisconnect, useAccount } from 'wagmi';
import { BACKEND_ENDPOINT, LENSPOST_APP_URL } from '@/data';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { IoGiftOutline } from 'react-icons/io5';
import { useEffect, useState, FC } from 'react';
import { useRouter } from 'next/navigation';
import { MenuIcon, X } from 'lucide-react';
import { UserAvatar } from '@/components';
import { useToast } from '@/ui/useToast';
import { FaPlus } from 'react-icons/fa';
import { LinkButton } from '@/ui';
import Cookies from 'js-cookie';
import { cn } from '@/utils';
import axios from 'axios';

import { AuthEvmResponse, UserDetails } from '../../../types';
import MobileMenu from './MobileMenu';

interface UserMenuProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  showMenu: boolean;
  isLight: boolean;
}

const UserMenu: FC<UserMenuProps> = ({
  isLight = true,
  setShowMenu,
  showMenu
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const sendSignatureToBackend = async () => {
    try {
      const body = {
        message: 'This message is to login you into lenspost dapp.',
        evm_address: address,
        signature: data
      };

      const response = await axios.post<AuthEvmResponse>(
        `${BACKEND_ENDPOINT}/auth/evm`,
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
        Cookies.set('username', address ?? '', { expires: 1 });
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
            `${BACKEND_ENDPOINT}/user/`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`
              }
            }
          );

          if (res.data) {
            const userData = await res.data;
            setPosterToken(userData?.balance || null);
          } else {
          }
        } catch (error) {}
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
          target="_blank"
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
};

export default UserMenu;
