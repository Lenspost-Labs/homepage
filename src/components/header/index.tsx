'use client';

import { clearAllLocalStorageData } from '@/utils/clearLocalStorage';
import { getFromLocalStorage } from '@/utils/localStorage';
import { usePathname, useParams } from 'next/navigation';
import { useDisconnect, useAccount } from 'wagmi';
import { useEffect, useState, FC } from 'react';
import { nonBgRoutes } from '@/data';
import { useToast } from '@/ui';

import MobileMenu from './menu/MobileMenu';
import UserMenu from './menu/User';
import Search from './search';
import Logo from './Logo';
import Menu from './menu';

const Header: FC = () => {
  const pathname = usePathname();
  const params = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn = true;
  const isProfilePage = params?.hasOwnProperty('profile');
  const isLight =
    isProfilePage || nonBgRoutes.includes(pathname) ? false : true;
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const jwtToken = getFromLocalStorage('jwt');

  useEffect(() => {
    const clearLocalStorage = () => {
      if (jwtToken === undefined) return;

      const jwtExpiration = 24 * 60 * 60 * 1000;
      const jwtTimestamp = getFromLocalStorage('jwtTimestamp');
      const currentTimestamp = new Date().getTime();
      if (jwtTimestamp && currentTimestamp - jwtTimestamp > jwtExpiration) {
        disconnect();
        clearAllLocalStorageData();
        toast({
          description:
            'Your session has expired. Please connect your wallet again',
          title: 'Session Expired',
          variant: 'destructive'
        });
      }
    };

    const interval = setInterval(clearLocalStorage, 15 * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtToken]);

  return (
    <>
      <div className="absolute inset-0 z-10 flex h-16 w-full flex-row items-center justify-between space-x-0 border-b border-theme-light-purple/50 px-5 py-6 lg:h-20 lg:space-x-6 lg:px-20">
        <div className="flex flex-row items-center space-x-5 lg:space-x-10">
          <Logo isLight={isLight} />
          <Menu isLight={isLight} />
        </div>
        <Search withBg={isLight} />
        <UserMenu
          setShowMenu={setShowMenu}
          isLoggedIn={isLoggedIn}
          showMenu={showMenu}
          isLight={isLight}
        />
      </div>

      {showMenu && (
        <div className="relative z-[10000] w-full">
          <MobileMenu setShow={setShowMenu} show={showMenu} />
        </div>
      )}
    </>
  );
};

export default Header;
