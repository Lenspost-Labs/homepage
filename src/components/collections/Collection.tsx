import Image from 'next/image'
import UserAvatar from '../UserAvatar'
import { FaRegThumbsUp } from 'react-icons/fa'
import { LuRefreshCw } from 'react-icons/lu'
import { TbArrowFork } from 'react-icons/tb'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Dropdown from '@/ui/Dropdown'

export interface CollectionType {
	id: number
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

function getAspectRatio(width: number, height: number) {
	if (!width || !height) return 1
	return width / height
}

function Collection({ collection }: { collection: CollectionType[] }) {
	return (
		<div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 w-full">
			{collection.map((item, index) => {
				const aspectRatio = getAspectRatio(item?.width, item?.height)
				return (
					<div
						key={index}
						//style={{ aspectRatio: aspectRatio }}
						className="relative border-2 md:border-4 h-min w-full group bg-theme-light-purple-50  border-theme-light-purple-50 p-1 md:p-2 rounded-2xl overflow-hidden"
					>
						<img src={item.image} alt={item.title} className="rounded-xl object-cover w-full" />
						<div className="absolute inset-0 group-hover:opacity-100 opacity-0 duration-100 bg-black/25 p-3 m-2 rounded-xl">
							<div className="flex flex-row items-center justify-between">
								<div className="flex flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-2 py-2">
									<button className="text-white">
										<TbArrowFork size={20} />
									</button>
								</div>
								<div className="flex flex-row items-center space-x-1">
									<div className="flex flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-3 py-2">
										<button className="text-white">
											<LuRefreshCw size={18} />
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
													<BsThreeDotsVertical size={24} color="white" />
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
							<div className="flex flex-row w-full absolute bottom-0 left-0 px-3 pb-3 justify-between items-center space-x-2">
								<UserAvatar isVerified={true} username={item.creator} href="/profile/clayton" size="sm" />
								<div className="flex flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-3 py-2">
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
				)
			})}
		</div>
	)
}

export default Collection
