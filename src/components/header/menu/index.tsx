import Link from 'next/link'
import React from 'react'

function Menu() {
	let items = [
		{
			link: '/',
			text: 'Feed',
		},
		{
			link: '/',
			text: 'Raveshop',
		},
	]
	const MenuLink = ({ href, title }: { href: string; title: string }) => {
		return (
			<>
				<Link href={href} className="text-xl text-white font-medium">
					{title}
				</Link>
			</>
		)
	}
	return (
		<>
			<div className="flex flex-row space-x-10">
				{items.map((item, index) => {
					return <MenuLink href={item.link} key={index} title={item.text} />
				})}
			</div>
		</>
	)
}

export default Menu
