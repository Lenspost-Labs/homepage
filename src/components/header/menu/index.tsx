import { MENU_ITEMS } from '@/data';
import { cn } from '@/utils';
import Link from 'next/link';
import { FC } from 'react';

const Menu: FC<{ isLight: boolean }> = ({ isLight = true }) => {
  const MenuLink: FC<{ title: string; href: string }> = ({ title, href }) => {
    return (
      <Link
        className={cn('text-xl font-medium', { 'text-white': isLight })}
        href={href}
      >
        {title}
      </Link>
    );
  };
  return (
    <div className="hidden flex-row space-x-10 lg:flex">
      {MENU_ITEMS.map((item, index) => {
        return <MenuLink title={item.text} href={item.link} key={index} />;
      })}
    </div>
  );
};

export default Menu;
