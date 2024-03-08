import React from 'react'
import Logo from './Logo'
import Menu from './menu'
import Search from './search'
import UserMenu from './menu/User'

function Header() {
	let isLoggedIn = true
	return (
		<>
			<div className="w-full absolute inset-0 flex flex-row justify-between px-20 h-20 items-center py-6 border-b border-theme-light-purple/50">
				<div className="flex flex-row items-center space-x-8">
					<Logo />
					<Menu />
				</div>
				<Search />
				<UserMenu isLoggedIn={isLoggedIn} />
			</div>
		</>
	)
}

export default Header
