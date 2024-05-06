import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Logo({ isLight = true }: { isLight: boolean }) {
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
}

export default Logo;
