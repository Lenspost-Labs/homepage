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
	const avatarSize = size === 'md' ? 'w-14 h-14' : size === 'lg' ? 'w-16 h-16' : size === 'xl' ? 'w-32 h-32' : 'w-10 h-10'
	const verifiedSize = size === 'md' ? 32 : size === 'lg' ? 36 : size === 'xl' ? 60 : 20
	const imageSize = size === 'md' ? '56' : size === 'lg' ? '64' : size === 'xl' ? '128' : '40'
	const Avatar = () => {
		return (
			<div className="flex flex-row items-center space-x-4">
				<div className={cn('relative bg-theme-light-purple border border-theme-border-gray rounded-full', avatarSize)}>
					<Image src="/avatar.png" alt="user" width={imageSize} height={imageSize} className="rounded-full" />
					{isVerified && (
						<div className={cn('absolute top-0', { '-right-4': size === 'xl', ' -right-2': size === 'md' || size === 'lg' || size === 'sm' })}>
							<CheckMarkIcon size={verifiedSize} />
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
