'use client'
import { Button } from '@/ui/Button'
import Dropdown from '@/ui/Dropdown'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

function UserInfo() {
	return (
		<div className="flex flex-col md:flex-row justify-center md:justify-between mt-24 md:mt-40 space-y-5 space-x-0 md:space-y-0 md:space-x-20 items-center w-full px-5 md:px-20">
			<div className="flex flex-col space-y-5 md:space-y-6 flex-1 pr-0 md:pr-8">
				<div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
					<div className="flex-1">
						<h1 className="text-3xl md:text-6xl font-bold">Claynosaurz</h1>
					</div>
					<div className="flex md:mt-0 mt-4 flex-row items-center justify-center space-x-4">
						<Button className="" outline={true} title="Follow" />
						<Button className="" outline={true} title="0x2e...f6a3" />
						<div>
							<Dropdown
								position="left"
								trigger={
									<button>
										<BsThreeDotsVertical size={28} color="black" />
									</button>
								}
								options={[
									{ label: 'Share', onClick: () => console.log('Trending') },
									{ label: 'Embed', onClick: () => console.log('Newest') },
								]}
							/>
						</div>
					</div>
				</div>
				<div>
					<p className="text-base md:text-xl font-medium">
						Lorem ipsum dolor sit amet consectetur. Sagittis proin facilisis nisl dictumst laoreet morbi placerat luctus. Ut interdum tristique aliquam id nisi
						lorem vitae. Faucibus dictum eu qu.
					</p>
				</div>
			</div>
			<div className="flex flex-row items-center space-x-5 md:space-x-10 justify-between">
				<div className="flex items-center md:items-end justify-center space-y-1 md:space-y-6 flex-col">
					<p className="text-base md:text-2xl font-semibold">Following</p>
					<p className="text-2xl md:text-5xl font-bold">54</p>
				</div>
				<div className="flex items-center md:items-end justify-center space-y-1 md:space-y-6 flex-col">
					<p className="text-base md:text-2xl font-semibold">Followers</p>
					<p className="text-2xl md:text-5xl font-bold">190K</p>
				</div>
			</div>
		</div>
	)
}

export default UserInfo
