import { cn } from '@/lib/utils'
import { CheckMarkIcon } from '@/ui/Icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface UserAvatarProps {
	isVerified: boolean
	username?: string
	size?: 'sm' | 'md' | 'lg' | 'xl'
	href?: string
}

function UserAvatar({ isVerified, username, size = 'sm', href }: UserAvatarProps) {
	const avatarSize = size === 'md' ? 'w-14 h-14' : size === 'lg' ? 'w-16 h-16' : size === 'xl' ? 'md:w-32 md:h-32 h-28 w-28' : 'w-10 h-10'
	const verifiedSize = size === 'md' ? 'w-14 h-14' : size === 'lg' ? 'w-16 h-16' : size === 'xl' ? 'md:w-14 md:h-14 h-12 w-12' : 'w-6 h-6'
	const imageSize = size === 'md' ? '56' : size === 'lg' ? '64' : size === 'xl' ? '128' : '40'
	const Avatar = () => {
		return (
			<div className="flex flex-row items-center space-x-4">
				<div className={cn('relative bg-theme-light-purple border border-theme-border-gray rounded-full', avatarSize)}>
					<Image src="/avatar.png" alt="user" width={imageSize} height={imageSize} className="rounded-full" />
					{isVerified && (
						<div className={cn('absolute top-0', { '-right-4': size === 'xl', ' -right-2': size === 'md' || size === 'lg' || size === 'sm' })}>
							<CheckMarkIcon className={verifiedSize} />
						</div>
					)}
				</div>
				{username && <p className="text-2xl font-semibold lowercase text-white">@{username}</p>}
			</div>
		)
	}
	return (
		<>
			{href ? (
				<Link href={href}>
					<Avatar />
				</Link>
			) : (
				<Avatar />
			)}
		</>
	)
}

export default UserAvatar
