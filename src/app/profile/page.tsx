import UserAvatar from '@/components/UserAvatar'
import Link from 'next/link'
import React from 'react'
import { FaXTwitter, FaDiscord } from 'react-icons/fa6'
import { FaCog } from 'react-icons/fa'
import { PiButterflyFill } from 'react-icons/pi'
import ProfileCollections from '@/components/collections/ProfileCollections'
import CounterBox from '@/components/CounterBox'

function Profile() {
	return (
		<>
			<div className="flex flex-col pt-36 pb-20 items-center px-20">
				<ProfileInfo />
			</div>
		</>
	)
}

export default Profile

export const ProfileInfo = () => {
	return (
		<>
			<div className="flex w-full flex-row items-center justify-between border border-theme-light-purple rounded-[30px] p-8">
				<div className="flex items-center flex-row space-x-10">
					<UserAvatar isVerified size="xl" />
					<div className="flex flex-col space-y-2">
						<p className="text-5xl font-bold lowercase">@chakralens</p>
						<p className="text-4xl font-semibold text-theme-light-purple">Pro Memoor</p>
					</div>
				</div>
				<div className="flex items-end flex-col space-y-10">
					<div>
						<button>
							<FaCog size={40} className="cursor-pointer" />
						</button>
					</div>
					<div className="flex flex-row items-center space-x-4">
						<Link href="https://bsky.app/">
							<PiButterflyFill size={40} className="cursor-pointer" />
						</Link>
						<Link href="https://discord.com/">
							<FaDiscord size={40} className="cursor-pointer" />
						</Link>
						<Link href="https://x.com/">
							<FaXTwitter size={30} className="cursor-pointer" />
						</Link>
					</div>
				</div>
			</div>
			<div className="flex flex-row w-full space-x-10 py-10">
				<CounterBox title="POSTER Tokens" count="1,680" percentage="23.8" week="this" />
				<CounterBox title="Posts" count="221" percentage="23" week="this" />
			</div>
			<div>
				<ProfileCollections />
			</div>
		</>
	)
}
