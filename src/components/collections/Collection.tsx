'use client'
import React, { useEffect, useState } from 'react'
import CollectionItem from './CollectionItem'
import { useInView } from 'react-cool-inview'
import { UNSPLASH_API_CLIENT_ID } from '@/lib/Constants'
import Masonry from '@mui/lab/Masonry'
import { Loader } from '@/ui/Loader'
import axios from 'axios'
import { Asset, NFTAsset, NFTType, StickerAssets, StickersType, TemplateAsset, TemplateData, TemplatesType } from '../../../types/types'
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

function Collection({ collection, tab }: { collection: CollectionType[]; tab: string }) {
	const [images, setImages] = useState<Asset[] | []>([])
	const [allAssets, setAllAssets] = useState<(Asset | NFTAsset | StickerAssets)[]>([]);
	const [templates, setTemplates] = useState<TemplateAsset[] | []>([])
	const [nftsImages, setNftsImages] = useState<NFTAsset[] | []>([])
	const [stickerImages, setStickerImages] = useState<StickerAssets[]>([]);
	const [backgroundImages, setBackgroundImages] = useState<StickerAssets[]>([]);

	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [loading, setLoading] = useState(true)
	// const API_URL = `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${UNSPLASH_API_CLIENT_ID}`
	const TEMPLATE_API_URL= `${process.env.NEXT_PUBLIC_DEV_URL}/template/user?page=${page}`
	const NFT_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/user/nft/?page=${page}&chainId=2`;
	const STICKERS_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page}&type=props`;
	const BACKGROUND_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page}&type=background`;
	const TEMPLATES_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/template?page=1`;

	useEffect(() => {
		if (tab === 'Remix') {
			setPage(1);
			fetchImages()
		  }else if (tab === 'Templates') {
			setPage(1);
			fetchTemplates();
		  }
		  else if (tab === 'NFTs') {
			setPage(1);
			fetchNFTImages();
		  }else if (tab === 'Stickers'){
			setPage(1);
			fetchStickers();
		  }else if (tab === 'Backgrounds'){
			setPage(1);
			fetchBackgrounds();
		  }else if (tab === 'All') { 
			setPage(1);
			fetchAllAssets();
		  }
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab])
	const jwtToken = Cookies.get("jwt");
	const username = Cookies.get('username');

	const fetchAllAssets = async () => {
		try {
		  const [remixRes, nftsRes, stickersRes] = await Promise.all([
			axios.get<TemplatesType>(TEMPLATE_API_URL, {
			  headers: {
				Authorization: `Bearer ${jwtToken}`,
			  },
			}),
			axios.get<NFTType>(NFT_API_URL, {
			  headers: {
				Authorization: `Bearer ${jwtToken}`,
			  },
			}),
			axios.get<StickersType>(STICKERS_API_URL, {
			  headers: {
				Authorization: `Bearer ${jwtToken}`,
			  },
			}),
		  ]);
	  
		  const combinedAssets = [
			...remixRes.data.assets,
			...nftsRes.data.assets,
			...stickersRes.data.assets,
		  ];
	  
		  setAllAssets(combinedAssets);
		  setTotalPages(Math.max(remixRes.data.totalPage, nftsRes.data.totalPage, stickersRes.data.totalPage));
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };

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

	  const fetchTemplates = async () => {
		try {
		  const res = await axios.get<TemplateData>(TEMPLATES_API_URL, {
			headers: {
			  Authorization: `Bearer ${jwtToken}`,
			},
		  });
		  const totalPages = res.data.totalPage;
		  console.log("Response totalPage:", res.data.assets);
		  setTotalPages(Number(totalPages));
		  setTemplates(res.data.assets);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };


	  const fetchStickers = async () => {
		try {
		  const res = await axios.get<StickersType>(STICKERS_API_URL, {
			headers: {
			  Authorization: `Bearer ${jwtToken}`,
			},
		  });
		  const totalPages = res.data.totalPage;
		  console.log("Response totalPage:", res.data.assets);
		  setTotalPages(Number(totalPages));
		  setStickerImages(res.data.assets);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };

	  const fetchBackgrounds = async () => {
		try {
		  const res = await axios.get<StickersType>(BACKGROUND_API_URL, {
			headers: {
			  Authorization: `Bearer ${jwtToken}`,
			},
		  });
		  const totalPages = res.data.totalPage;
		  console.log("Response totalPage:", res.data.assets);
		  setTotalPages(Number(totalPages));
		  setBackgroundImages(res.data.assets);
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

	  const fetchNextTemplates = async () => {
		try {
		  const res = await axios.get<TemplateData>(
			`${process.env.NEXT_PUBLIC_DEV_URL}/template?page=${page + 1}`,
			{
			  headers: {
				Authorization: `Bearer ${jwtToken}`,
			  },
			}
		  );

		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  console.log("Response totalPage:", res.data.totalPage);
		  setTemplates((prevImages: TemplateAsset[]) => [...prevImages, ...res.data.assets]);
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

	  const fetchNextStickers = async () => {
		try {
		  const res = await axios.get<StickersType>(
			`${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page+1}&type=props`,
			{
			  headers: {
				Authorization: `Bearer ${jwtToken}`,
			  },
			}
		  );
	  
		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  setStickerImages((prevStickers: StickerAssets[]) => [...prevStickers, ...res.data.assets]);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };

	  const fetchNextBackgrounds = async () => {
		try {
		  const res = await axios.get<StickersType>(
			`${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page+1}&type=background`,
			{
			  headers: {
				Authorization: `Bearer ${jwtToken}`,
			  },
			}
		  );
	  
		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  setBackgroundImages((prevStickers: StickerAssets[]) => [...prevStickers, ...res.data.assets]);
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
			if (tab === 'Remix') {
			  await fetchNextImages();
			} else if (tab === 'NFTs') {
			  await fetchNextNFTImages();
			}else if (tab === 'Stickers') {
				await fetchNextStickers();
			}else if (tab === 'Backgrounds') {
				await fetchNextBackgrounds();
			}else if (tab === 'Templates') {
				await fetchNextTemplates();
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
					case 'Remix':
					return images?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{images?.map((item, index) => {
							console.log("Item:", item)
							return <CollectionItem key={index} tab={tab} item={item} username={username}  />;
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
							return <CollectionItem key={index} tab={tab} item={item} username={username}  />;
						})}
						</Masonry>
					) : null;
					case 'Stickers':
					return stickerImages?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{stickerImages?.map((item, index) => {
							return <CollectionItem key={index} tab={tab} item={item} username={username}  />;
						})}
						</Masonry>
					) : null;
					case 'Templates':
					return templates?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{templates?.map((item, index) => {
							return <CollectionItem key={index} tab={tab} item={item} username={username}  />;
						})}
						</Masonry>
					) : null;
					case 'Backgrounds':
					return backgroundImages?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{backgroundImages?.map((item, index) => {
							return <CollectionItem key={index} tab={tab} item={item} username={username} />;
						})}
						</Masonry>
					) : null;

					case 'All':
						return allAssets?.length > 0 ? (
							<Masonry
							defaultColumns={2}
							sx={{ margin: 0 }}
							columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
							spacing={2}
							>
							{allAssets?.map((item, index) => {
								return <CollectionItem key={index} tab={tab} item={item} username={username} />;
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
