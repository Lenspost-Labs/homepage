'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, forwardRef } from 'react'

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'dark' | 'success' | 'light' | 'outline' | 'warning' | 'invert'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	onClick?: () => void
	children?: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl'
	variant?: ButtonVariants
	icon?: ReactNode
	className?: string
	title?: string
	outline?: boolean
}

export const Button = ({ onClick, className = '', size = 'md', variant = 'primary', outline, title, children, icon }: ButtonProps) => {
	const commonStyles = {
		'border border-black': variant === 'primary',
		'border border-transparent': variant === 'secondary',
		'border border-red-600': variant === 'danger',
		'border border-yellow-600 focus:ring-yellow-400/50': variant === 'warning',
		'border border-white': variant === 'invert',
	}

	const nonOutlineStyles = {
		'bg-black text-white hover:bg-gray-900 active:bg-black': !outline && variant === 'primary',
		'bg-white hover:bg-theme-light-purple-50 hover:text-theme-purple active:text-theme-purple active:bg-theme-light-purple-50':
			!outline && variant === 'secondary',
		'bg-red-500 text-white hover:bg-red-400 active:bg-red-700': !outline && variant === 'danger',
		'bg-yellow-500 text-white hover:bg-yellow-400 active:bg-yellow-700': !outline && variant === 'warning',
	}

	const outlineStyles = {
		'text-black hover:bg-gray-50 active:bg-gray-100': outline && variant === 'primary',
		'text-gray-500 hover:bg-gray-50 active:bg-gray-100': outline && variant === 'secondary',
		'text-red-500 hover:bg-red-50 active:bg-red-100': outline && variant === 'danger',
		'text-yellow-500 hover:bg-yellow-50 active:bg-yellow-100': outline && variant === 'warning',
		'text-white hover:bg-gray-800 active:bg-gray-700': outline && variant === 'invert',
	}

	const sizeStyles = {
		'px-3 py-0.5 text-sm': size === 'sm',
		'px-4 py-[8px]': size === 'md',
		'px-5 py-1.5': size === 'lg',
	}
	return (
		<>
			<button
				onClick={onClick && onClick}
				className={cn(
					{
						...commonStyles,
						...nonOutlineStyles,
						...outlineStyles,
						...sizeStyles,
						'inline-flex items-center space-x-1.5': icon && children,
					},
					'rounded-full font-bold shadow-sm outline-none focus:outline disabled:opacity-50',
					className
				)}
			>
				{title && <span>{title}</span>}
				{icon ? icon : null}
			</button>
		</>
	)
}
