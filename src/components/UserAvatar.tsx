import { cn } from '@/lib/utils'
import { CheckMarkIcon } from '@/ui/Icons'
import Image from 'next/image'
import React from 'react'

interface UserAvatarProps {
	isVerified: boolean
	username?: string
	size?: 'sm' | 'md' | 'lg'
}

function UserAvatar({ isVerified, username, size }: UserAvatarProps) {
	let avatarSize = size === 'md' ? 'w-14 h-14' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10'
	let verifiedSize = size === 'md' ? 32 : size === 'lg' ? 36 : 20
	return (
		<>
			<div className="flex flex-row items-center space-x-4">
				<div className={cn('relative bg-theme-light-purple border border-theme-border-gray rounded-full', avatarSize)}>
					<Image src="/avatar.png" alt="user" width={48} height={48} className="rounded-full" />
					{isVerified && (
						<div className="absolute top-0 -right-2">
							<CheckMarkIcon size={verifiedSize} />
						</div>
					)}
				</div>
				{username && <p className="text-2xl font-semibold lowercase text-white">@{username}</p>}
			</div>
		</>
	)
}

export default UserAvatar
