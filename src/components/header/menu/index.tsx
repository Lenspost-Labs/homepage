import { MENU_ITEMS } from '@/data';
import { cn } from '@/utils';
import Link from 'next/link';
import { FC } from 'react';

interface MenuProps {
  isLight?: boolean;
}

const Menu: FC<MenuProps> = ({ isLight = true }) => {
  const MenuLink: FC<{ title: string; href: string }> = ({ title, href }) => (
    <Link
      className={cn('text-xl font-medium', { 'text-white': isLight })}
      href={href}
    >
      {title}
    </Link>
  );

  return (
    <div className="hidden flex-row space-x-10 lg:flex">
      {MENU_ITEMS.map((item, index) => (
        <MenuLink title={item.text} href={item.link} key={index} />
      ))}
    </div>
  );
};

export default Menu;
