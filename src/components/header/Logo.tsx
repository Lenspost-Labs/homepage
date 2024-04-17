import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo({ isLight = true }: { isLight: boolean }) {
	const logoPath = isLight ? '/logo.png' : '/logo-dark.png'
	return (
		<>
			<Link href="/" className="relative w-[140px] h-[21px] lg:h-[30px]  lg:w-[203px] z-10">
				<Image src={logoPath} alt="logo" fill className="lg:block hidden object-contain" />
				<Image src={logoPath} alt="logo" fill className="lg:hidden block object-contain" />
			</Link>
		</>
	)
}

export default Logo
