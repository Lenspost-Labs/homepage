import UserAvatar from '@/components/UserAvatar'
import { CheckMarkIcon } from '@/ui/Icons'
import { LinkButton } from '@/ui/LinkButton'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoGiftOutline } from 'react-icons/io5'
import { MdOutlineVerified } from 'react-icons/md'

interface Props {
	isLoggedIn: boolean
	isLight: boolean
}

function UserMenu({ isLoggedIn, isLight = true }: Props) {
	const UserProfile = ({ isVerified }: { isVerified: boolean }) => {
		return (
			<>
				<UserAvatar isVerified href="/profile" />
			</>
		)
	}
	return (
		<>
			<div className="flex flex-row items-center space-x-6">
				<LinkButton className="" outline={true} variant={isLight ? 'invert' : 'purple'} href="/" icon={<FaPlus size={14} />}>
					<span className="text-xl font-semibold">Create</span>
				</LinkButton>
				<UserProfile isVerified={true} />
				<LinkButton className="" outline={true} variant={isLight ? 'invert' : 'purple'} href="/" icon={<IoGiftOutline size={24} />}>
					<span className="text-xl font-semibold">168</span>
				</LinkButton>
			</div>
		</>
	)
}

export default UserMenu
