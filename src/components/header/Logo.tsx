import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo({ isLight = true }: { isLight: boolean }) {
	const logoPath = isLight ? '/logo.png' : '/logo-dark.png'
	return (
		<>
			<Link href="/">
				<Image src={logoPath} alt="logo" width="203" height="46" />
			</Link>
		</>
	)
}

export default Logo
