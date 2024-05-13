import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface LogoProps {
  isLight: boolean;
}

const Logo: FC<LogoProps> = ({ isLight }) => {
  const logoPath = isLight ? '/logo.png' : '/logo-dark.png';
  return (
    <Link
      className="relative z-10 h-[21px] w-[140px]  lg:h-[30px] lg:w-[203px]"
      href="/"
    >
      <Image
        className="hidden object-contain lg:block"
        src={logoPath}
        alt="logo"
        fill
      />
      <Image
        className="block object-contain lg:hidden"
        src={logoPath}
        alt="logo"
        fill
      />
    </Link>
  );
};

export default Logo;
