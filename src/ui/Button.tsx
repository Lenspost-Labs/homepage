'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, FC } from 'react';
import { cn } from '@/utils';

export type ButtonVariants =
  | 'secondary'
  | 'success'
  | 'outline'
  | 'warning'
  | 'primary'
  | 'danger'
  | 'invert'
  | 'light'
  | 'dark';

// TODO: name the props type as ComponentProps
interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  variant?: ButtonVariants;
  onClick?: () => void;
  className?: string;
  outline?: boolean;
  icon?: ReactNode;
  title?: string;
}

const Button: FC<Props> = ({
  variant = 'primary',
  className = '',
  size = 'md',
  children,
  onClick,
  outline,
  title,
  icon
}) => {
  const commonStyles = {
    'border border-yellow-600 focus:ring-yellow-400/50': variant === 'warning',
    'border border-transparent': variant === 'secondary',
    'border border-red-600': variant === 'danger',
    'border border-black': variant === 'primary',
    'border border-white': variant === 'invert'
  };

  const nonOutlineStyles = {
    'bg-white hover:bg-theme-light-purple-50 hover:text-theme-purple active:text-theme-purple active:bg-theme-light-purple-50':
      !outline && variant === 'secondary',
    'bg-yellow-500 text-white hover:bg-yellow-400 active:bg-yellow-700':
      !outline && variant === 'warning',
    'bg-red-500 text-white hover:bg-red-400 active:bg-red-700':
      !outline && variant === 'danger',
    'bg-black text-white hover:bg-gray-900 active:bg-black':
      !outline && variant === 'primary'
  };

  const outlineStyles = {
    'text-yellow-500 hover:bg-yellow-50 active:bg-yellow-100':
      outline && variant === 'warning',
    'text-gray-500 hover:bg-gray-50 active:bg-gray-100':
      outline && variant === 'secondary',
    'text-white hover:bg-gray-800 active:bg-gray-700':
      outline && variant === 'invert',
    'text-black hover:bg-gray-50 active:bg-gray-100':
      outline && variant === 'primary',
    'text-red-500 hover:bg-red-50 active:bg-red-100':
      outline && variant === 'danger'
  };

  const sizeStyles = {
    'px-3 py-0.5 text-sm': size === 'sm',
    'px-4 py-[8px]': size === 'md',
    'px-5 py-1.5': size === 'lg'
  };
  return (
    <button
      className={cn(
        {
          'inline-flex items-center space-x-1.5': icon && children,
          ...nonOutlineStyles,
          ...outlineStyles,
          ...commonStyles,
          ...sizeStyles
        },
        'rounded-full font-bold shadow-sm outline-none focus:outline disabled:opacity-50',
        className
      )}
      onClick={onClick && onClick}
    >
      {title && <span>{title}</span>}
      {icon ? icon : null}
    </button>
  );
};

export default Button;
