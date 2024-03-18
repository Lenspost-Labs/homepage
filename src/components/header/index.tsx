'use client'
import React from 'react'
import Logo from './Logo'
import Menu from './menu'
import Search from './search'
import UserMenu from './menu/User'
import { useParams, usePathname } from 'next/navigation'
import { nonBgRoutes } from '@/lib/Constants'

function Header() {
	const pathname = usePathname()
	const params = useParams()
	const isLoggedIn = true
	const isProfilePage = params?.hasOwnProperty('profile')
	const isLight = isProfilePage || nonBgRoutes.includes(pathname) ? false : true
	console.log('isLight', { isLight, params, has: isProfilePage, nonBgRoutes: !nonBgRoutes.includes(pathname), pathname })
	return (
		<>
			<div className="w-full absolute inset-0 flex flex-row justify-between px-5 lg:px-20 h-16 lg:h-20 items-center py-6 border-b border-theme-light-purple/50">
				<div className="flex flex-row items-center space-x-5 lg:space-x-10">
					<Logo isLight={isLight} />
					<Menu isLight={isLight} />
				</div>
				<Search withBg={isLight} />
				<UserMenu isLoggedIn={isLoggedIn} isLight={isLight} />
			</div>
		</>
	)
}

export default Header
