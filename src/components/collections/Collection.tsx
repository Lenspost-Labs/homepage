'use client';

import { useEffect, useState, FC } from 'react';
import { useInView } from 'react-cool-inview';
import { useParams } from 'next/navigation';
import Masonry from '@mui/lab/Masonry';
import Cookies from 'js-cookie';
import { Loader } from '@/ui';
import axios from 'axios';

import {
  ProfileCollections,
  CollectionType,
  StickerAssets,
  TemplateAsset,
  UserCanvaType,
  DegenAssets,
  NFTAsset,
  Asset
} from '../../types/types';
import CollectionItem from './CollectionItem';
import { BACKEND_ENDPOINT } from '@/data';

interface CollectionProps {
  collection: CollectionType[];
  selectedAddress: string;
  nftValue: string;
  sticker: string;
  tab: string;
}
const Collection: FC<CollectionProps> = ({
  selectedAddress,
  collection,
  nftValue,
  sticker,
  tab
}) => {
  const [assets, setAssets] = useState<
    (
      | ProfileCollections
      | StickerAssets
      | TemplateAsset
      | UserCanvaType
      | DegenAssets
      | NFTAsset
      | Asset
    )[]
  >([]);
  const [uniqueChickenCampaign, setUniqueChickenCampaign] = useState<
    DegenAssets[]
  >([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const username = Cookies.get('username');
  const userId = Cookies.get('userId');
  const jwtToken = Cookies.get('jwt');

  const params = useParams();
  const profileId = params.profile;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchAssets();
      } catch (error) {
        // console.log(error);
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
        setAssets(
          data.assets || data.data || data.images || data.message || data
        );
      }

      setTotalPages(data.totalPage);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchNextAssets = async () => {
    try {
      const response = await axios.get(
        getApiUrl(tab, page + 1),
        getApiConfig(tab)
      );
      const data = response.data;

      if (tab === 'Chicken') {
        const uniqueData: { [key: string]: DegenAssets } = {};

        data.data.forEach((item: DegenAssets) => {
          if (!uniqueData[item.id]) {
            uniqueData[item.id] = item;
          }
        });

        const newUniqueChickenCampaign = Object.values(uniqueData);
        setUniqueChickenCampaign((prevCampaign) => [
          ...prevCampaign,
          ...newUniqueChickenCampaign
        ]);
        setAssets((prevAssets) => [...prevAssets, ...newUniqueChickenCampaign]);
      } else {
        setAssets((prevAssets) => [
          ...prevAssets,
          ...(data.assets || data.data || data.images || data.message)
        ]);
      }
      setTotalPages(data.totalPage);
    } catch (error) {
      // console.log(error);
    }
  };

  const getApiUrl = (tab: string, page?: number) => {
    switch (tab) {
      case 'Remix':
        return `${BACKEND_ENDPOINT}/template/user?page=${page || 1}`;
      case 'CC0':
        return `${BACKEND_ENDPOINT}/collection/${selectedAddress}?page=${page || 1}`;
      case 'NFTs':
        return `${BACKEND_ENDPOINT}/asset/shared-canvas-mint-images`;
      case 'Stickers':
        return `${BACKEND_ENDPOINT}/asset/?page=${page || 1}&type=props`;
      case 'Backgrounds':
        return `${BACKEND_ENDPOINT}/asset/?page=${page || 1}&type=background`;
      case 'Templates':
        return `${BACKEND_ENDPOINT}/template?page=${page || 1}`;
      case 'NFTs ':
        return `${BACKEND_ENDPOINT}/user/nft/?page=${page || 1}&chainId=${nftValue}`;
      case 'Collections ':
        return `${BACKEND_ENDPOINT}/public/shared-canvas-mint-images?${userId || profileId}`;
      case 'Remix ':
        return `${BACKEND_ENDPOINT}/public/canvases-by-user?q=${userId || profileId}`;
      case 'Degen':
        return `${BACKEND_ENDPOINT}/asset/canvases-by-campaign/degen?page=${page || 1}&limit=20`;
      case 'Gloom':
        return `${BACKEND_ENDPOINT}/asset/canvases-by-campaign/Gloom?page=${page || 1}&limit=20`;
      case 'Chicken':
        return `${BACKEND_ENDPOINT}/asset/canvases-by-campaign/chicken?page=${page || 1}&limit=20`;
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
    }
  });

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {assets.length > 0 && (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
          defaultColumns={2}
          sx={{ margin: 0 }}
          spacing={2}
        >
          {(tab === 'Chicken' ? uniqueChickenCampaign : assets).map(
            (item, index) => (
              <CollectionItem
                username={username || ''}
                key={index}
                item={item}
                tab={tab}
              />
            )
          )}
        </Masonry>
      )}
      {hasMore && (
        <span
          className="flex h-full w-full items-center justify-center p-10"
          ref={observe}
        >
          <Loader />
        </span>
      )}
    </>
  );
};

export default Collection;
