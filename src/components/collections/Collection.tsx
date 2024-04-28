'use client'
import React, { useCallback, useEffect, useState } from 'react'
import CollectionItem from './CollectionItem'
import { useInView } from 'react-cool-inview'
import Masonry from '@mui/lab/Masonry'
import { Loader } from '@/ui/Loader'
import axios from 'axios'
import { Asset, CollectionData, UserCanvas, CollectionType,ProfileCollectionCanvas, CollectionProfile, DegenType, DegenAssets, NFTAsset, NFTType, ProfileCollectionData, ProfileCollections, StickerAssets, StickersType, TemplateAsset, TemplateData, TemplatesType, UserCanvaType } from '../../../types/types'
import Cookies from "js-cookie";
import { useParams } from 'next/navigation';

const Collection: React.FC<{ collection: CollectionType[]; tab: string; selectedAddress: string; nftValue: string; sticker: string }> = ({ collection, tab, selectedAddress, nftValue, sticker }) => {
  const [assets, setAssets] = useState<(Asset | NFTAsset | StickerAssets | DegenAssets | TemplateAsset | UserCanvaType | ProfileCollections)[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get('userId');
  const [uniqueChickenCampaign, setUniqueChickenCampaign] = useState<DegenAssets[]>([]);
  const params = useParams();
  const profileId = params.profile;
  const username = Cookies.get('username');
  const jwtToken = Cookies.get("jwt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchAssets();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab, selectedAddress, nftValue, sticker]);

  const fetchAssets = async () => {
    try {
      const response = await axios.get(getApiUrl(tab), getApiConfig(tab));
      const data = response.data;
	  
	  if (tab === 'Chicken') {
		const uniqueData: { [key: string]: DegenAssets } = {};
  
		data.data.forEach((item: DegenAssets) => {
		  if (!uniqueData[item.id]) {
			uniqueData[item.id] = item;
		  }
		});
  
		const uniqueChickenCampaign = Object.values(uniqueData);
		setUniqueChickenCampaign(uniqueChickenCampaign);
		setAssets(uniqueChickenCampaign);
	  } else {
		setAssets(data.assets || data.data || data.images || data.message || data);
	  }

	  setTotalPages(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextAssets = async () => {
    try {
      const response = await axios.get(getApiUrl(tab, page + 1), getApiConfig(tab));
      const data = response.data;

	  if (tab === 'Chicken') {
		const uniqueData: { [key: string]: DegenAssets } = {};
  
		data.data.forEach((item: DegenAssets) => {
		  if (!uniqueData[item.id]) {
			uniqueData[item.id] = item;
		  }
		});
  
		const newUniqueChickenCampaign = Object.values(uniqueData);
		setUniqueChickenCampaign((prevCampaign) => [...prevCampaign, ...newUniqueChickenCampaign]);
		setAssets((prevAssets) => [...prevAssets, ...newUniqueChickenCampaign]);
	  } else {
		setAssets((prevAssets) => [...prevAssets, ...(data.assets || data.data || data.images || data.message)]);
	  }
	setTotalPages(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const getApiUrl = (tab: string, page?: number) => {
    switch (tab) {
      case 'Remix':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/template/user?page=${page || 1}`;
      case 'CC0':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/collection/${selectedAddress}?page=${page || 1}`;
      case 'NFTs':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/asset/shared-canvas-mint-images`;
      case 'Stickers':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page || 1}&type=props`;
      case 'Backgrounds':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/asset/?page=${page || 1}&type=background`;
      case 'Templates':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/template?page=${page || 1}`;
      case 'NFTs ':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/user/nft/?page=${page || 1}&chainId=${nftValue}`;
      case 'Collections ':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/public/shared-canvas-mint-images?${userId || profileId}`;
      case 'Remix ':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/public/canvases-by-user?q=${userId|| profileId}`;
      case 'Degen':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/asset/canvases-by-campaign/degen?page=${page || 1}&limit=20`;
      case 'Chicken':
        return `${process.env.NEXT_PUBLIC_DEV_URL}/asset/canvases-by-campaign/chicken?page=${page || 1}&limit=20`;
      default:
        return '';
    }
  };

  const getApiConfig = (tab: string) => {
    const config: any = {};

    if (tab === 'NFTs ') {
      config.headers = { Authorization: `Bearer ${jwtToken}` };
    }

    return config;
  };

  const hasMore = page < totalPages;

  const { observe } = useInView({
    onChange: async ({ inView }) => {
      if (inView && hasMore) {
        setPage((prevPage) => prevPage + 1);
        await fetchNextAssets();
      }
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  return (
	<>
	  {assets.length > 0 && (
		<Masonry
		  defaultColumns={2}
		  sx={{ margin: 0 }}
		  columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
		  spacing={2}
		>
		  {(tab === 'Chicken' ? uniqueChickenCampaign : assets).map((item, index) => (
			<CollectionItem key={index} tab={tab} item={item} username={username} />
		  ))}
		</Masonry>
	  )}
	  {hasMore && (
		<span ref={observe} className="flex items-center justify-center w-full h-full p-10">
		  <Loader />
		</span>
	  )}
	</>
  );
};

export default Collection;