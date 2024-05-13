'use client';

import {
  getUserCollectionAssets,
  getAssetsByCampaign,
  getUserRemixAssets,
  getPublicAssets
} from '@/services';
import { CollectionType, DegenAssets } from '@/types';
import { useEffect, useState, FC } from 'react';
import { useInView } from 'react-cool-inview';
import { useParams } from 'next/navigation';
import Masonry from '@mui/lab/Masonry';
import Cookies from 'js-cookie';
import { Loader } from '@/ui';

import CollectionItem from './CollectionItem';

interface CollectionProps {
  collection: CollectionType[];
  isProfilePage?: boolean;
  selectedAddress: string;
  nftValue: string;
  sticker: string;
  tab: string;
}

const Collection: FC<CollectionProps> = ({
  selectedAddress,
  isProfilePage,
  collection,
  nftValue,
  sticker,
  tab
}) => {
  const [assets, setAssets] = useState<any>([]);
  const [uniqueChickenCampaign, setUniqueChickenCampaign] = useState<
    DegenAssets[]
  >([]);
  const [errorMessages, setErrorMessages] = useState<string>('');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const params = useParams();
  const profileId = params.profile;

  const username = Cookies.get('username');

  const fetchDataForHome = async () => {
    if (tab === 'Remix') {
      const res = await getPublicAssets(1);
      if (res?.isError) {
        setErrorMessages(res?.message || 'Error fetching data');
      }

      setTotalPages(res?.totalPage || 0);
      setAssets(res?.assets || []);
    } else {
      const res = await getAssetsByCampaign(tab, 1);
      if (res?.isError) {
        setErrorMessages(res?.message || 'Error fetching data');
      }

      setTotalPages(res?.totalPages || 0);
      setAssets(res?.assets || []);
    }
  };

  const fetchDataForProfile = async () => {
    if (tab === 'Remix') {
      const res = await getUserRemixAssets();
      if (res?.isError) {
        setErrorMessages(res?.message || 'Error fetching data');
      }

      setAssets(res?.assets || []);
    } else {
      const res = await getUserCollectionAssets();
      if (res?.isError) {
        setErrorMessages(res?.message || 'Error fetching data');
      }

      setAssets(res?.assets || []);
    }
  };

  const fetchAssets = async () => {
    if (isProfilePage) {
      fetchDataForProfile();
    } else {
      fetchDataForHome();
    }
  };

  const fetchNextAssets = async () => {
    if (tab === 'Remix') {
      const res = await getPublicAssets(page);
      if (res?.isError) {
        setErrorMessages(res?.message || 'Error fetching data');
      }

      setTotalPages(res?.totalPage || 0);
      setAssets([...assets, ...(res?.assets || [])]);
    } else {
      const res = await getAssetsByCampaign(tab?.toLowerCase(), page);
      if (res?.isError) {
        setErrorMessages(res?.message || 'Error fetching data');
      }

      setTotalPages(res?.totalPages || 0);
      setAssets([...assets, ...(res?.assets || [])]);
    }
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

  useEffect(() => {
    fetchAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

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
          // eslint-disable-next-line perfectionist/sort-objects
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
          defaultColumns={2}
          sx={{ margin: 0 }}
          spacing={2}
        >
          {assets?.map((item: any, index: any) => (
            <CollectionItem
              isProfilePage={isProfilePage}
              username={username}
              key={index}
              item={item}
              tab={tab}
            />
          ))}
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
