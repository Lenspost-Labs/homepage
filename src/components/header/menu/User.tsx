'use client';

import { getFromLocalStorage } from '@/utils/localStorage';
import { IoGiftOutline } from 'react-icons/io5';
import usePrivyAuth from '@/hooks/usePrivyAuth';
import { UserAvatar } from '@/components';
import { LENSPOST_APP_URL } from '@/data';
import { LinkButton, Button } from '@/ui';
import { FaPlus } from 'react-icons/fa';
import { useState, FC } from 'react';
import { useAccount } from 'wagmi';

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
  const { address } = useAccount();

  const jwtToken = getFromLocalStorage('jwt');
  const username = getFromLocalStorage('username');

  const { login } = usePrivyAuth();

  // useEffect(() => {
  //   if (isError && error?.name === 'InternalRpcError') {
  //     disconnect();
  //     toast({
  //       description: 'You have rejected the login request.',
  //       title: 'Login Failed ❌',
  //       variant: 'destructive'
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isError]);

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

        {/* {!jwtToken || !address ? (
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
        </div> */}

        {!jwtToken || !address ? (
          <div className="group">
            <Button className="rounded-md" onClick={login} title="Login" />
          </div>
        ) : (
          <div className="group">
            <UserAvatar username={username || address} isVerified />
          </div>
        )}

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
