'use client'
import React, { useEffect, useState } from 'react'
import CollectionItem from './CollectionItem'
import { useInView } from 'react-cool-inview'
import { UNSPLASH_API_CLIENT_ID } from '@/lib/Constants'

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

export interface ImageType {
	id: string
	alt_description: string
	urls: {
		regular: string
	}
	user: {
		username: string
	}
	likes: number
}

function Collection({ collection, tab }: { collection: CollectionType[]; tab: string }) {
	const [images, setImages] = useState<ImageType[] | []>([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [loading, setLoading] = useState(true)
	const API_URL = `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${UNSPLASH_API_CLIENT_ID}`

	useEffect(() => {
		fetchImages()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchImages = async () => {
		try {
			const res = await fetch(API_URL)
			const data = await res.json()
			const totalPages = res.headers.get('x-total')
			setTotalPages(Number(totalPages))
			setImages(data)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const fetchNextImages = async () => {
		//setLoading(true)
		try {
			const res = await fetch(API_URL)
			const data = await res.json()
			const totalPages = res.headers.get('x-total')
			setTotalPages(Number(totalPages))
			setImages((prevImages: ImageType[]) => [...prevImages, ...data])
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const hasMore = page < totalPages

	const { observe } = useInView({
		onChange: async ({ inView }) => {
			if (!inView || !hasMore) {
				return
			}
			setPage(page + 1)
			await fetchNextImages()
		},
	})
	if (loading || !images) {
		return (
			<div className="flex items-center justify-center w-full h-full">
				<p>Loading...</p>
			</div>
		)
	}
	return (
		<>
			{!loading && images && (
				<div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 w-full">
					{images?.map((item, index) => {
						return <CollectionItem key={index} item={item} />
					})}
				</div>
			)}
			{hasMore ? <span ref={observe} className="flex justify-center p-10" /> : null}
		</>
	)
}

export default Collection
