import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo({ isLight = true }: { isLight: boolean }) {
	const logoPath = isLight ? '/logo.png' : '/logo-dark.png'
	return (
		<>
			<Link href="/" className="relative z-10">
				<Image src={logoPath} alt="logo" width="203" height="46" className="lg:block hidden" />
				<Image src={logoPath} alt="logo" width="140" height="46" className="lg:hidden block" />
			</Link>
		</>
	)
}

export default Logo
