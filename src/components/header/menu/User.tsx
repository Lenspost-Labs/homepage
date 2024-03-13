'use client'
import UserAvatar from '@/components/UserAvatar'
import { LinkButton } from '@/ui/LinkButton'
import { Transition } from '@headlessui/react'
import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoGiftOutline } from 'react-icons/io5'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'

interface Props {
	isLoggedIn: boolean
	isLight: boolean
}

function UserMenu({ isLoggedIn, isLight = true }: Props) {
	const [showMenu, setShowMenu] = React.useState(false)

	return (
		<>
			<div className="flex flex-row justify-end items-center space-x-4 lg:space-x-6">
				<LinkButton
					className="!p-2 lg:!px-4 lg:!py-[8px] lg:!flex !hidden"
					outline={true}
					variant={isLight ? 'invert' : 'purple'}
					href="/"
					icon={<FaPlus className="lg:w-4 lg:h-4 w-6 h-6" />}
				>
					<span className="text-xl font-semibold lg:block hidden">Create</span>
				</LinkButton>
				<UserAvatar isVerified href="/profile" />
				<div className="lg:hidden block relative z-40">
					<button
						onClick={() => setShowMenu(!showMenu)}
						className={cn('p-2 rounded-full border', { 'border-white': isLight, 'border-theme-light-purple': !isLight })}
					>
						{!showMenu ? (
							<MenuIcon size={24} className={cn({ 'text-white': isLight, 'text-theme-light-purple': !isLight })} />
						) : (
							<X size={24} className={cn({ 'text-white': isLight, 'text-theme-light-purple': !isLight })} />
						)}
					</button>
				</div>
				<LinkButton className="lg:flex hidden" outline={true} variant={isLight ? 'invert' : 'purple'} href="/" icon={<IoGiftOutline size={24} />}>
					<span className="text-xl font-semibold">168</span>
				</LinkButton>
			</div>
			{showMenu && <MobileMenu show={showMenu} setShow={setShowMenu} />}
		</>
	)
}

export default UserMenu
