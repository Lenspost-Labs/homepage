'use client';

import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';
import { useSignMessage, useDisconnect, useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { IoGiftOutline } from 'react-icons/io5';
import { useEffect, useState, FC } from 'react';
import { useRouter } from 'next/navigation';
import { MenuIcon, X } from 'lucide-react';
import { LENSPOST_APP_URL } from '@/data';
import { UserAvatar } from '@/components';
import { useToast } from '@/ui/useToast';
import { FaPlus } from 'react-icons/fa';
import { authEvm } from '@/services';
import { LinkButton } from '@/ui';
import { cn } from '@/utils';

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
  const [isLogingIn, setIsLogingIn] = useState(false);
  const { isDisconnected, isConnected, address } = useAccount();
  const { signMessage, isSuccess, isError, error, data } = useSignMessage();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const router = useRouter();

  const jwtToken = getFromLocalStorage('jwt');
  const username = getFromLocalStorage('username');

  async function getSignature() {
    if (isDisconnected || jwtToken) return;
    const message = 'This message is to login you into lenspost dapp.';
    signMessage({ message });
  }

  const sendSignatureToBackend = async () => {
    const message = 'This message is to login you into lenspost dapp.';
    const evm_address = address;
    const signature = data;

    const response = await authEvm(evm_address, signature, message);

    if (response?.isError) {
      disconnect();
      return toast({
        description: 'An error occurred while logging in.',
        variant: 'destructive',
        title: 'Error ❌'
      });
    }

    toast({
      description: 'You have successfully logged in.',
      title: 'Login Successful ✅'
    });

    saveToLocalStorage('jwt', response?.jwt ?? '');
    saveToLocalStorage('userId', response?.userId);
    saveToLocalStorage('jwtTimestamp', new Date().getTime()?.toString());
    saveToLocalStorage('username', response?.username || address);
  };

  useEffect(() => {
    if (!jwtToken && isConnected) {
      getSignature();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    if (isSuccess) {
      sendSignatureToBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error?.name === 'InternalRpcError') {
      disconnect();
      toast({
        description: 'You have rejected the login request.',
        title: 'Login Failed ❌',
        variant: 'destructive'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

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
        {!jwtToken || !address ? (
          <div className="group">
            <UserAvatar
              onClick={() => {
                setIsLogingIn(true);
                openConnectModal?.();
              }}
              isVerified
            />
          </div>
        ) : (
          <div className="group">
            <UserAvatar href={`/profile/${username}`} isVerified />
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
