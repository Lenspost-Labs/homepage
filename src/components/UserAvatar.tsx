import { CheckMarkIcon } from '@/ui';
import Image from 'next/image';
import { cn } from '@/utils';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
  onClick?: () => void;
  isVerified: boolean;
  username?: string;
  color?: string;
  href?: string;
}

const UserAvatar: FC<Props> = ({
  size = 'sm',
  isVerified,
  username,
  onClick,
  color,
  href
}) => {
  const avatarSize =
    size === 'md'
      ? 'w-14 h-14'
      : size === 'lg'
        ? 'w-16 h-16'
        : size === 'xl'
          ? 'lg:w-32 lg:h-32 h-28 w-28'
          : size === 'sm'
            ? 'w-10 h-10'
            : 'w-7 h-7 lg:w-10 lg:h-10';
  const verifiedSize =
    size === 'md'
      ? 'w-14 h-14'
      : size === 'lg'
        ? 'w-16 h-16'
        : size === 'xl'
          ? 'lg:w-14 lg:h-14 h-12 w-12'
          : size === 'sm'
            ? 'w-5 h-5'
            : 'w-4 h-4 lg:w-6 lg:h-6';
  const imageSize =
    size === 'md'
      ? '56'
      : size === 'lg'
        ? '64'
        : size === 'xl'
          ? '128'
          : size === 'sm'
            ? '40'
            : '40';
  const Avatar = () => {
    username =
      typeof username === 'string'
        ? username
        : String(username) === 'undefined'
          ? ''
          : String(username);
    return (
      <div className="flex cursor-pointer flex-row items-center space-x-3 lg:space-x-3">
        <div
          className={cn(
            'relative flex rounded-full border border-theme-border-gray',
            avatarSize,
            color === 'new' ? 'bg-[#E1F36D]' : 'bg-theme-light-purple',
            'transition duration-300 ease-in-out group-hover:shadow-purple-500'
          )}
          onClick={onClick}
        >
          <Image className="rounded-full" src="/avatar.png" alt="user" fill />
          {isVerified && (
            <div
              className={cn('absolute top-0', {
                ' -right-2':
                  size === 'md' ||
                  size === 'lg' ||
                  size === 'sm' ||
                  size === 'xs',
                '-right-4': size === 'xl'
              })}
            >
              <CheckMarkIcon className={verifiedSize} />
            </div>
          )}
        </div>
        {username && (
          <p className="hidden overflow-hidden text-ellipsis text-nowrap text-sm font-semibold lowercase text-white lg:block lg:flex-1 lg:text-2xl">
            {username?.startsWith('0x')
              ? `${username.slice(0, 4)}..${username.slice(-4)}`
              : `@${username}`}
          </p>
        )}
      </div>
    );
  };

  return href ? (
    <Link legacyBehavior href={href}>
      <Avatar />
    </Link>
  ) : (
    <a onClick={onClick}>
      <Avatar />
    </a>
  );
};

export default UserAvatar;
