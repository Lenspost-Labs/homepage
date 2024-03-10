'use client'
import { Button } from '@/ui/Button'
import Dropdown from '@/ui/Dropdown'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

function UserInfo() {
	return (
		<div className="flex flex-row justify-between mt-40 space-x-20 items-center w-full px-20">
			<div className="flex flex-col space-y-6 flex-1 pr-8">
				<div className="flex flex-row items-center justify-between">
					<div className="flex-1">
						<h1 className="text-6xl font-bold">Claynosaurz</h1>
					</div>
					<div className="flex flex-row items-center justify-center space-x-4">
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
					<p className="text-xl font-medium">
						Lorem ipsum dolor sit amet consectetur. Sagittis proin facilisis nisl dictumst laoreet morbi placerat luctus. Ut interdum tristique aliquam id nisi
						lorem vitae. Faucibus dictum eu qu.
					</p>
				</div>
			</div>
			<div className="flex flex-row items-center space-x-10 justify-between">
				<div className="flex items-end justify-center space-y-6 flex-col">
					<p className="text-2xl font-semibold">Following</p>
					<p className="text-5xl font-bold">54</p>
				</div>
				<div className="flex items-end justify-center space-y-6 flex-col">
					<p className="text-2xl font-semibold">Followers</p>
					<p className="text-5xl font-bold">190K</p>
				</div>
			</div>
		</div>
	)
}

export default UserInfo
