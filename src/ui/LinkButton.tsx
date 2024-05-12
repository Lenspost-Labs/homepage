import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  FC
} from 'react';
import Link from 'next/link';
import { cn } from '@/utils';

export type ButtonVariants =
  | 'secondary'
  | 'success'
  | 'primary'
  | 'outline'
  | 'warning'
  | 'danger'
  | 'purple'
  | 'invert'
  | 'green'
  | 'light'
  | 'dark';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: ButtonVariants;
  children: ReactNode;
  className?: string;
  outline?: boolean;
  icon?: ReactNode;
  target?: string;
  href: string;
}

const LinkButton: FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  size = 'md',
  children,
  outline,
  target,
  href,
  icon
}) => {
  const commonStyles = {
    'border border-yellow-600 focus:ring-yellow-400/50': variant === 'warning',
    'border border-theme-light-purple': variant === 'purple',
    'border-[1px] border-[#E1F16B]': variant === 'invert',
    'border border-gray-600': variant === 'secondary',
    'border border-[#E1F16B]': variant === 'green',
    'border border-red-600': variant === 'danger',
    'border border-black': variant === 'primary'
  };

  const nonOutlineStyles = {
    'bg-yellow-500 text-white hover:bg-yellow-400 active:bg-yellow-700':
      !outline && variant === 'warning',
    'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700':
      !outline && variant === 'secondary',
    'bg-red-500 text-white hover:bg-red-400 active:bg-red-700':
      !outline && variant === 'danger',
    'bg-black text-white hover:bg-gray-900 active:bg-black':
      !outline && variant === 'primary'
  };

  const outlineStyles = {
    'text-theme-light-purple hover:text-white active:text-white hover:bg-theme-light-purple active:bg-theme-light-purple':
      outline && variant === 'purple',
    'text-[#2C346B] active:text-white hover:bg-[#E1F36D] active:bg-theme-light-purple':
      outline && variant === 'green',
    'text-yellow-500 hover:bg-yellow-50 active:bg-yellow-100':
      outline && variant === 'warning',
    'text-gray-500 hover:bg-gray-50 active:bg-gray-100':
      outline && variant === 'secondary',
    'text-black hover:bg-gray-50 active:bg-gray-100':
      outline && variant === 'primary',
    'text-white hover:bg-gray-800 active:bg-gray-700':
      outline && variant === 'invert',
    'text-red-500 hover:bg-red-50 active:bg-red-100':
      outline && variant === 'danger'
  };

  const sizeStyles = {
    'px-3 py-0.5 text-sm': size === 'sm',
    'px-4 py-[8px]': size === 'md',
    'px-5 py-1.5': size === 'lg'
  };

  return (
    <Link
      className={cn(
        {
          'items-center space-x-0 md:space-x-1.5': icon && children,
          ...nonOutlineStyles,
          ...outlineStyles,
          ...commonStyles,
          ...sizeStyles
        },
        'rounded-full font-bold shadow-sm outline-none focus:outline disabled:opacity-50',
        className
      )}
      target={target}
      href={href}
    >
      <span>{children}</span>
      {icon ? icon : null}
    </Link>
  );
};

export default LinkButton;
