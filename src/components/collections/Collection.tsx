'use client'
import React, { useEffect, useState } from 'react'
import CollectionItem from './CollectionItem'
import { useInView } from 'react-cool-inview'
import { UNSPLASH_API_CLIENT_ID } from '@/lib/Constants'
import Masonry from '@mui/lab/Masonry'
import { Loader } from '@/ui/Loader'
import axios from 'axios'
import { Asset, NFTAsset, NFTType, TemplatesType } from '../../../types/types'
import Cookies from "js-cookie";

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
	const [images, setImages] = useState<Asset[] | []>([])
	const [nftsImages, setNftsImages] = useState<NFTAsset[] | []>([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [loading, setLoading] = useState(true)
	// const API_URL = `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${UNSPLASH_API_CLIENT_ID}`
	const TEMPLATE_API_URL= `${process.env.NEXT_PUBLIC_DEV_URL}/template/user?page=${page}`
	const NFT_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/user/nft/?page=${page}&chainId=2`;

	useEffect(() => {
		if (tab === 'Templates') {
			setPage(1);
			fetchImages()
		  }else if (tab === 'NFTs') {
			setPage(1);
			fetchNFTImages();
		  }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab])
	const jwtToken = Cookies.get("jwt");

	const fetchNFTImages = async () => {
		try {
		  const res = await axios.get<NFTType>(NFT_API_URL, {
			headers: {
			  Authorization: `Bearer ${jwtToken}`,
			},
		  });
		  const totalPages = res.data.totalPage;
		  console.log("Response totalPage:", res.data.assets);
		  setTotalPages(Number(totalPages));
		  setNftsImages(res.data.assets);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };


	const fetchImages = async () => {
		try {
			const res = await axios.get<TemplatesType>(TEMPLATE_API_URL,
				{
					headers: {
					  Authorization: `Bearer ${jwtToken}`,
					},
				  }
				);
			const totalPages = res.data.totalPage;
			// console.log("Response totalPage:", res.data.totalPage);
			setTotalPages(Number(totalPages))
			setImages(res.data.assets)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const fetchNextImages = async () => {
		try {
		  const res = await axios.get<TemplatesType>(
			`${process.env.NEXT_PUBLIC_DEV_URL}/template/user?page=${page + 1}`,
			{
			  headers: {
				Authorization: `Bearer ${jwtToken}`,
			  },
			}
		  );

		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  console.log("Response totalPage:", res.data.totalPage);
		  setImages((prevImages: Asset[]) => [...prevImages, ...res.data.assets]);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };

	  const fetchNextNFTImages = async () => {
		try {
		  const res = await axios.get<NFTType>(
			`${process.env.NEXT_PUBLIC_DEV_URL}/user/nft/?page=${page + 1}&chainId=2`,
			{
			  headers: {
				Authorization: `Bearer ${jwtToken}`,
			  },
			}
		  );
	  
		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  setNftsImages((prevNFTs: NFTAsset[]) => [...prevNFTs, ...res.data.assets]);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };

	

	const hasMore = page < totalPages

	const { observe } = useInView({
		onChange: async ({ inView }) => {
		  if (inView && page < totalPages) {
			setPage((prevPage) => prevPage + 1);
			if (tab === 'Templates') {
			  await fetchNextImages();
			} else if (tab === 'NFTs') {
			  await fetchNextNFTImages();
			}
		  }
		},
	  });

	if (loading || !images) {
		return (
			<div className="flex items-center justify-center w-full h-screen">
				<Loader />
			</div>
		)
	}
	return (
		<>
			{!loading && (
				// <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 w-full">
				// 	{images?.map((item, index) => {
				// 		return <CollectionItem key={index} item={item} />
				// 	})}
				// </div>
				<div className="w-full">
					 {(() => {
				switch (tab) {
					case 'Templates':
					return images?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{images?.map((item, index) => {
							console.log("Item:", item)
							return <CollectionItem key={index} tab={tab} item={item} />;
						})}
						</Masonry>
					) : null;
					case 'NFTs':
					return nftsImages?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{nftsImages?.map((item, index) => {
							return <CollectionItem key={index} item={item} />;
						})}
						</Masonry>
					) : null;
					default:
					return null;
          		}
        	})()}
				</div>
			)}
			{hasMore ? (
				<span ref={observe} className="flex items-center justify-center w-full h-full p-10">
					<Loader />
				</span>
			) : null}
		</>
	)
}

export default Collection
