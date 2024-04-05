'use client'
import React, { useCallback, useEffect, useState } from 'react'
import CollectionItem from './CollectionItem'
import { useInView } from 'react-cool-inview'
import { UNSPLASH_API_CLIENT_ID, tabs } from '@/lib/Constants'
import Masonry from '@mui/lab/Masonry'
import { Loader } from '@/ui/Loader'
import axios from 'axios'
import { Asset, CollectionData, CollectionProfile,DegenType, DegenAssets, NFTAsset, NFTType, ProfileCollectionData, ProfileCollections, StickerAssets, StickersType, TemplateAsset, TemplateData, TemplatesType } from '../../../types/types'
import Cookies from "js-cookie";
import debounce from 'lodash.debounce';

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

const getNFTCollectionAPIURL = 
	(address: string, page: number) =>
	  `${process.env.NEXT_PUBLIC_DEV_URL}/collection/${address}?page=${page}`;

const getProfileNFT =  (value:string, page:number) => `${process.env.NEXT_PUBLIC_DEV_URL}/user/nft/?page=${page}&chainId=${value}`;

	

function Collection({ collection, tab,selectedAddress ,nftValue,sticker }: { collection: CollectionType[]; tab: string ;selectedAddress:string ;nftValue:string ; sticker:string}) {
	const [images, setImages] = useState<Asset[] | []>([])
	const [profileNFTs, setProfileNFTs] = useState<NFTAsset[] | []>([])
	const [allAssets, setAllAssets] = useState<(Asset | NFTAsset | StickerAssets)[]>([]);
	const [templates, setTemplates] = useState<TemplateAsset[] | []>([])
	const [nftsImages, setNftsImages] = useState<NFTAsset[] | []>([])
	const [stickerImages, setStickerImages] = useState<StickerAssets[]>([]);
	const [backgroundImages, setBackgroundImages] = useState<StickerAssets[]>([]);
	const [degenCampaign, setDegenCampaign] = useState<DegenAssets[]>([]);
	const [profileCollections, setProfileCollections] = useState<ProfileCollections[]>([]);
	const [profileRemix, setProfileRemix] = useState<Asset[]>([]);
	const [nftAsset , setNftAsset] = useState([]);
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [loading, setLoading] = useState(true)
	// const API_URL = `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${UNSPLASH_API_CLIENT_ID}`
	const TEMPLATE_API_URL= `${process.env.NEXT_PUBLIC_DEV_URL}/template/user?page=${page}`
	const NFT_HOME_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/asset/shared-canvas-mint-images`;
	const NFT_COLLECTION_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/collection/${selectedAddress}?page=${page}`;
	const STICKERS_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page}&type=props`;
	const BACKGROUND_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page}&type=background`;
	const TEMPLATES_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/template?page=1`;
	const DEGEN_CAMPAIGN_API_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/asset/canvases-by-campaign/degen?page=${page}&limit=20`;
	const jwtToken = Cookies.get("jwt");
	
	console.log("Selected from collections:", sticker);
	useEffect(() => {
		const fetchData = async () => {
		  try {
			setLoading(true); // Set loading to true before fetching data
			if (tab === 'Remix') {
			  setPage(1);
			  await fetchImages();
			} else if (tab === 'Templates') {
			  setPage(1);
			  await fetchTemplates();
			} else if (tab === 'CC0') {
			  setPage(1);
			  await fetchNFTImages();
			} else if (tab === 'NFTs') {
			  await fetchNFTHome();
			} else if (tab === 'Stickers') {
			  setPage(1);
			  await fetchStickers();
			} else if (tab === 'Backgrounds') {
			  setPage(1);
			  await fetchBackgrounds();
			} else if (tab === 'Collections ') {
			  setPage(1);
			  await fetchProfileCollections();
			} else if (tab === 'All') {
			  setPage(1);
			  await fetchAllAssets();
			} else if (tab === 'NFTs ') {
			  setPage(1);
			  await fetchProfileNFT();
			} else if (tab === 'Remix ') {
			  setPage(1);
			  await fetchProfileRemix();
			}else if (tab === 'Degen') {
				setPage(1);
				await fetchDegenCampaign();
			}
		  } catch (error) {
			console.log(error);
		  } finally {
			setLoading(false); 
		  }
		};
	  
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [tab, selectedAddress, nftValue, sticker]);
	

	
	const username = Cookies.get('username');

	const fetchAllAssets = async () => {
		try {
		  const [remixRes, nftsRes, stickersRes] = await Promise.all([
			axios.get<TemplatesType>(TEMPLATE_API_URL, {
			  
			}),
			axios.get<NFTType>(getNFTCollectionAPIURL("0x975d74900ef48F53Fa7d4F3550FA0C89f3B3c1Dc", page), {}),
			axios.get<StickersType>(STICKERS_API_URL, {
			  
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

	  const fetchProfileRemix = async () => {
		try {
		  setProfileRemix([]);
		  let currentPage = 1;
		  let totalPages = 1;
		  const userId = Cookies.get('userId');
		  let matchingAssets: Asset[] = [];
		  console.log("Loadingstate:", loading);
		  while (currentPage <= totalPages) {
			const res = await axios.get<TemplatesType>(`${process.env.NEXT_PUBLIC_DEV_URL}/template/user?page=${currentPage}`);
			totalPages = res.data.totalPage;
	  
			const pageMatchingAssets = res.data.assets.filter(asset => asset.ownerId === parseInt(userId || ""));
			matchingAssets = [...matchingAssets, ...pageMatchingAssets];
	  
			if (currentPage === totalPages) {
			  break;
			}
	  
			currentPage++;
		  }
		  console.log(matchingAssets);
		  setProfileRemix(matchingAssets);
		  console.log(matchingAssets);
		  setTotalPages(totalPages);
		} catch (error) {
		  console.log(error);
		}
	  };

	  const fetchNFTHome = async () => {
		try {
		  setLoading(true);
		  const res = await axios.get(NFT_HOME_API_URL);
		  setNftAsset(res.data.images);
		  console.log("NFT Home:", res.data);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };

	  const fetchDegenCampaign = async () => {
		try {
			
		  setLoading(true);
		  const res = await axios.get<DegenType>(DEGEN_CAMPAIGN_API_URL);
		  const totalPages = res.data.totalPage;
		  setTotalPages(totalPages);
		  setDegenCampaign(res.data.data);
		  
		} catch (error) {
				console.log(error);	
		}
		finally {
			setLoading(false);
		}
	}

	  const fetchProfileCollections = async () => {
		try {
		  setLoading(true);
		  const userId = Cookies.get('userId');
		  const res = await axios.get<ProfileCollectionData>(`${process.env.NEXT_PUBLIC_DEV_URL}/asset/shared-canvas-mint-images?page=${page}`);
		  const totalPages = res.data.totalPage;
		  setTotalPages(totalPages);
		  const userAssets = res.data.data.flatMap(collection => {
			const { canvas } = collection;
			if (canvas.ownerId === 20) {
			  return [canvas];
			}
			return [];
		  });
		  console.log("User assets:", userAssets);
		  setProfileCollections(prevCollections => [...prevCollections, ...userAssets]);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };
	  

	const fetchProfileNFT = async () => {
		try {
		  setLoading(true);
		  const res = await axios.get<NFTType>(getProfileNFT(nftValue,page), {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			}
		});
		  const totalPages = res.data.totalPage;
		  console.log("Response totalPage:", res.data.assets);
		  setTotalPages(Number(totalPages));
		  setProfileNFTs(res.data.assets);
		  console.log("Profile NFTs after setting state:", res.data.assets);

		} catch (error) {
		  console.log(error);
	}
		finally {
			setLoading(false);
		}
}

	const fetchNFTImages = async () => {
		try {
		  setLoading(true); 
		  const res = await axios.get<NFTType>(getNFTCollectionAPIURL(selectedAddress, page), {});
		  const totalPages = res.data.totalPage;
		  console.log("Selected address fetched:", selectedAddress);
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
		  
		  setStickerImages([]);
		  let currentPage = 1;
		  let authorStickers: StickerAssets[] = [];
		  let totalPages = 1;
	  
		  while (currentPage <= totalPages) {
			const res = await axios.get<StickersType>(`${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${currentPage}&type=props`);
			const assets = res.data.assets;
			const filteredStickers = assets.filter(asset => asset.author === sticker);
			authorStickers = [...authorStickers, ...filteredStickers];
	  
			totalPages = res.data.totalPage;
	  
			if (currentPage === totalPages && filteredStickers.length === 0) {
			  setStickerImages([]);
			  return;
			}
	  
			currentPage++;
		  }
	  
		  setStickerImages(authorStickers);
		  setTotalPages(totalPages);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };

	  const fetchBackgrounds = async () => {
		try {
		  const res = await axios.get<StickersType>(BACKGROUND_API_URL, {

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


	// const fetchNextProfileRemix = async () => {
	// 	if (page < totalPages) {
	// 	  try {
	// 		const res = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}/template/user?page=${page + 1}`);
	// 		const newTotalPages = res.data.totalPage;
	// 		setTotalPages(newTotalPages);
	// 		const userId = Cookies.get('userId');
	// 		// parseInt(userId || "")
	// 		const matchingAssets = res.data.assets.filter((asset: { ownerId: number }) => asset.ownerId === 2543);
	// 		setProfileRemix((prevRemix: Asset[]) => [...prevRemix, ...matchingAssets]);
	// 	  } catch (error) {
	// 		console.log(error);
	// 	  } finally {
	// 		setLoading(false);
	// 	  }
	// 	}
	//   };
	const fetchNextImages = async () => {
		try {
		  const res = await axios.get<TemplatesType>(
			`${process.env.NEXT_PUBLIC_DEV_URL}/template/user?page=${page + 1}`,
			
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

	  const fetchNextProfileNFTs = async () => {
		try {
		  const res = await axios.get<NFTType>(
			getProfileNFT(nftValue, page + 1),
			{
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				}
			}
		  );
		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  console.log('Response dekh yaha:', res.data.totalPage)
		  setProfileNFTs((prevNFTs: NFTAsset[]) => [...prevNFTs, ...res.data.assets]);
		} catch (error) {
				console.log(error);
		}
		finally {
			setLoading(false);
		}
	}

	  const fetchNextTemplates = async () => {
		try {
		  const res = await axios.get<TemplateData>(
			`${process.env.NEXT_PUBLIC_DEV_URL}/template?page=${page + 1}`,
			
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
			getNFTCollectionAPIURL(selectedAddress, page + 1),			
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

	  const fetchNextDegenCampaign = async () => {
		try {
		  const res = await axios.get<DegenType>(`${process.env.NEXT_PUBLIC_DEV_URL}/asset/canvases-by-campaign/degen?page=${page + 1}&limit=20`);
		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  setDegenCampaign((prevDegen: DegenAssets[]) => [...prevDegen, ...res.data.data]);
		} catch (error) {
			console.log(error);
		}
		finally {
			setLoading(false);
		}
	}
	  

	  const fetchNextProfileCollections = async () => {
		if (totalPages === 0) {
			return; 
		  }
		try {
		  setLoading(true);
		  const userId = Cookies.get('userId');
		  const res = await axios.get<ProfileCollectionData>(`${process.env.NEXT_PUBLIC_DEV_URL}/asset/shared-canvas-mint-images?page=${page + 1}`);
		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  if (newTotalPages === 0) {
			return;
		  }
		  const userAssets = res.data.data.flatMap(collection => {
			const { canvas } = collection;
			if (canvas.ownerId === 20) {
			  return [canvas];
			}
			return [];
		  });
		  setProfileCollections(prevCollections => [...prevCollections, ...userAssets]);
		} catch (error) {
		  console.log(error);
		} finally {
		  setLoading(false);
		}
	  };

	  const fetchNextStickers = async () => {
		try {
		  const res = await axios.get<StickersType>(`${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page + 1}&type=props`);
		  const newTotalPages = res.data.totalPage;
		  setTotalPages(newTotalPages);
		  const authorStickers = res.data.assets.filter(asset => asset.author === sticker);
	  
		  setStickerImages((prevStickers: StickerAssets[]) => [...prevStickers, ...authorStickers]);
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

	const debouncedFetchNextProfileCollections = debounce(fetchNextProfileCollections, 500);

	const { observe } = useInView({
		onChange: async ({ inView }) => {
		  if (inView && page < totalPages) {
			setPage((prevPage) => prevPage + 1);
			if (tab === 'Remix') {
			  await fetchNextImages();
			} else if (tab === 'CC0') {
			  await fetchNextNFTImages();
			}else if (tab === 'Stickers') {
				await fetchNextStickers();
			}else if (tab === 'Backgrounds') {
				await fetchNextBackgrounds();
			}else if (tab === 'Templates') {
				await fetchNextTemplates();
			}else if (tab === 'NFTs ') {
				await fetchNextProfileNFTs();
			}else if (tab === 'Collections ') {
				await debouncedFetchNextProfileCollections();
			}else if (tab === 'Degen') {
				await fetchNextDegenCampaign();
			}
			// } else if (tab === 'Remix ') {
			// 	await fetchNextProfileRemix();
			// }
		  }
		},
	  });

	if (loading || !images || loading && profileRemix.length === 0) {
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
							return <CollectionItem key={index} tab={tab} item={item} username={item.ownerId || username}  />;
						})}
						</Masonry>
					) : null;
					case 'Degen':
					return degenCampaign?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{degenCampaign?.map((item, index) => {
							return <CollectionItem key={index} tab={tab} item={item} username={username}  />;
						})}
						</Masonry>
					) : null;
					case 'CC0':
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
					case 'Collections ':
					return profileCollections?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{profileCollections?.map((item, index) => {
							return <CollectionItem key={index} tab={tab} item={item} username={username}  />;
						})}
						</Masonry>
					) : null;
					case 'NFTs ':
					return profileNFTs?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{profileNFTs?.map((item, index) => {
							return <CollectionItem key={index} tab={tab} item={item} username={username}  />;
						})}
						</Masonry>
					) : null;
					case 'NFTs':
					return nftAsset?.length > 0 ? (
						<Masonry
						defaultColumns={2}
						sx={{ margin: 0 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
						spacing={2}
						>
						{nftAsset?.map((item, index) => {
							return <CollectionItem key={index} tab={tab} item={item} username={username} />;
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
					case 'Remix ':
						return profileRemix?.length > 0 ? (
							<Masonry
							defaultColumns={2}
							sx={{ margin: 0 }}
							columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
							spacing={2}
							>
							{profileRemix?.map((item, index) => {
								console.log("Item:", item)
								return <CollectionItem key={index} tab={tab} item={item} username={username}  />;
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
