import React from 'react'
import CollectionItem from './CollectionItem'

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
				return <CollectionItem key={index} item={item} />
			})}
		</div>
	)
}

export default Collection
