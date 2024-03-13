import { cn } from '@/lib/utils'
import Dropdown from '@/ui/Dropdown'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuRefreshCw } from 'react-icons/lu'
import { TbArrowFork } from 'react-icons/tb'
import UserAvatar from '../UserAvatar'
import { FaRegThumbsUp } from 'react-icons/fa'

interface Props {
	item: {
		image: string
		title: string
		description: string
		price: string
		creator: string
		likes: number
		comments: number
		isVerified: boolean
		reposts: number
		width: number
		height: number
	}
}

function CollectionItem({ item }: Props) {
	const [showOverlay, setShowOverlay] = React.useState(false)
	return (
		<>
			<div
				//onClick={() => setShowOverlay(!showOverlay)}
				//style={{ aspectRatio: aspectRatio }}
				className="relative border-2 md:border-4 h-min w-full group bg-theme-light-purple-50  border-theme-light-purple-50 p-1 md:p-2 rounded-2xl overflow-hidden"
			>
				<img src={item.image} alt={item.title} className="rounded-xl object-cover w-full" />
				<div
					className={cn('absolute inset-0 group-hover:opacity-100 opacity-0 duration-100 bg-black/25 p-3 md:m-2 rounded-xl', {
						'opacity-100': showOverlay,
					})}
				>
					<div className="flex flex-row items-center justify-between">
						<div className="flex flex-row items-center md:space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-2 py-2">
							<button className="text-white">
								<TbArrowFork className="md:w-5 md:h-5 w-3 h-3" />
							</button>
						</div>
						<div className="flex flex-row items-center space-x-1">
							<div className="md:flex hidden flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-3 py-2">
								<button className="text-white">
									<LuRefreshCw className="md:w-5 md:h-5 w-3 h-3" />
								</button>
								<div>
									<p className="text-white text-base font-medium">{item.reposts}k</p>
								</div>
							</div>
							<div>
								<Dropdown
									position="right"
									trigger={
										<button>
											<BsThreeDotsVertical className="md:w-5 md:h-5 w-4 h-4" color="white" />
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
					<div className="flex flex-col md:flex-row w-full absolute bottom-0 left-0 px-3 pb-3 justify-between md:items-center space-x-0 md:space-x-2">
						<UserAvatar isVerified={true} username={item.creator} href="/profile/clayton" size="xs" />
						<div className="hidden md:flex flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-3 py-2">
							<button className="text-white">
								<FaRegThumbsUp size={20} />
							</button>
							<button className="text-white">
								<LuRefreshCw size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CollectionItem