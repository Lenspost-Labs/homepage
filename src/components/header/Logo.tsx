import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
	return (
		<>
			<Link href="/">
				<Image src="/logo.png" alt="logo" width="203" height="46" />
			</Link>
		</>
	)
}

export default Logo
