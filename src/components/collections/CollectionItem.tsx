'use client';

import { useEffect, useState, FC } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { cn } from '@/utils';
import Link from 'next/link';

import UserAvatar from '../UserAvatar';

interface CollectionItemProps {
  username: string;
  tab: string;
  item: any;
}
const CollectionItem: FC<CollectionItemProps> = ({ username, item, tab }) => {
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isGif, setIsGif] = useState(false);

  useEffect(() => {
    const checkIfGif = async () => {
      try {
        const response = await fetch(item?.imageURL, { method: 'HEAD' });
        const contentType = response.headers.get('Content-Type');
        setIsGif(contentType?.includes('image/gif') ?? false);
      } catch (error) {
        setIsGif(false);
      }
    };

    checkIfGif();
  }, [item?.imageURL, tab]);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const getImageSrcAndDimensions = () => {
    let imageSrc = null;
    let [width, height] = [1080, 1080];

    if (tab === 'Remix') {
      if (item.ipfsLink && item.ipfsLink.length > 0) {
        imageSrc = `https://lenspost-ipfs.b-cdn.net/${item.ipfsLink[0]}`;
        if (item.data) {
          [width, height] = [item.data.width || 1080, item.data.height || 1080];
        }
      }
    } else if (tab === 'Remix ') {
      imageSrc = item.image;
    } else if (tab === 'All') {
      if ('imageURL' in item) imageSrc = item?.imageURL;
      else if ('imageLink' in item) imageSrc = item.imageLink[0];
      else if ('dimensions' in item) imageSrc = item.image;
      if ('data' in item)
        [width, height] = [item?.data.width || 1080, item?.data.height || 1080];
      else if ('dimensions' in item) [width, height] = item.dimensions;
    } else if (tab === 'CC0') {
      imageSrc = item?.imageURL;
    } else if (tab === 'NFTs') {
      imageSrc = item?.permaLink || item;
    } else if (tab === 'Collections ') {
      imageSrc = item.canvas.imageLink[0];
    } else if (tab === 'Degen' || tab === 'Chicken' || tab === 'Gloom') {
      imageSrc = item.imageLink[0];
      if ('data' in item)
        [width, height] = [
          item?.data?.width || 1080,
          item?.data?.height || 1080
        ];
    } else if (tab === 'Stickers' || tab === 'Backgrounds') {
      imageSrc = item?.image;
      [width, height] = item.dimensions;
    } else if (tab === 'Templates') {
      imageSrc = item?.image;
      [width, height] = [item.data.width, item.data.height];
    }

    return [imageSrc, width, height];
  };

  const renderImage = () => {
    if (imageLoadError) return null;

    const [imageSrc, width, height] = getImageSrcAndDimensions();

    if (!imageSrc) return null;

    return (
      <Image
        className="w-full rounded-xl object-cover"
        onError={handleImageError}
        alt={item.title || ''}
        unoptimized={isGif}
        height={height}
        src={imageSrc}
        loading="lazy"
        sizes="100vw"
        width={width}
        quality={80}
      />
    );
  };

  const isRemix = tab === 'Remix' && item.ipfsLink && item.ipfsLink.length > 0;
  const isUserPage =
    (tab === 'Remix ' && item?.image) || tab === 'Collections ';
  const isFarcaster =
    (tab === 'Chicken' || tab === 'Degen' || tab === 'Gloom') &&
    item.platform === 'farcaster';

  return (
    <>
      {(isFarcaster || isRemix) && (
        <Link
          href={
            isRemix
              ? `https://app.poster.fun/?slugId=${item?.slug?.[0]}`
              : `https://warpcast.com/~/conversations/${item?.txHash}`
          }
          target="blank"
        >
          <motion.div
            className="group relative w-full rounded-2xl border-2 border-theme-light-purple-50 bg-theme-light-purple-50 p-1 lg:border-4 lg:p-2"
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderImage()}
            <div
              className={cn(
                'absolute inset-0 m-1 rounded-xl bg-black/25 p-3 opacity-0 duration-100 group-hover:opacity-100 lg:m-2'
              )}
            >
              <div className="flex flex-row items-center justify-between">
                {/* <div className="flex flex-row items-center lg:space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-2 py-2">
                  <button className="text-white">
                    <TbArrowFork className="lg:w-5 lg:h-5 w-3 h-3" />
                  </button>
                </div> */}
                <div className="flex flex-row items-center justify-center space-x-1">
                  {/* <div className="lg:flex hidden flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-3 py-2">
                    <button className="text-white">
                      <LuRefreshCw className="lg:w-5 lg:h-5 w-3 h-3" />
                    </button>
                    <div>
                      <p className="text-white text-base font-medium">{item.likes}k</p>
                    </div>
                  </div> */}
                  {/* <div>
                    <PopoverMenu
                      position="right"
                      trigger={
                        <button>
                          <BsThreeDotsVertical className="lg:w-6 mt-2 lg:h-6 w-4 h-4" color="white" />
                        </button>
                      }
                      options={[
                        { label: 'Share', onClick: () => console.log('Trending') },
                        { label: 'Embed', onClick: () => console.log('Newest') },
                      ]}
                    />
                  </div> */}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 flex w-full flex-row items-center justify-between space-x-0 pb-3">
                <div className="max-w-auto px-3 lg:max-w-[60%] xl:max-w-[60%] 2xl:max-w-[70%]">
                  <UserAvatar
                    username={isRemix || isFarcaster ? item.ownerId : username}
                    href={`/profile/${isFarcaster ? item.ownerId : username}`}
                    isVerified={true}
                    size="xs"
                  />
                </div>
                <div className="px-3">
                  {/* <div className="flex flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-3 py-2">
                    <button className="text-white">
                      <FaRegThumbsUp className="lg:w-5 lg:h-5 w-3 h-3" />
                    </button>
                    <button className="text-white">
                      <LuRefreshCw className="lg:w-5 lg:h-5 w-3 h-3" />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      )}
      {isUserPage && (
        <motion.div
          className="group relative w-full rounded-2xl border-2 border-theme-light-purple-50 bg-theme-light-purple-50 p-1 lg:border-4 lg:p-2"
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {renderImage()}
          <div
            className={cn(
              'absolute inset-0 m-1 rounded-xl bg-black/25 p-3 opacity-0 duration-100 group-hover:opacity-100 lg:m-2'
            )}
          >
            <div className="flex flex-row items-center justify-between">
              {/* <div className="flex flex-row items-center lg:space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-2 py-2">
                  <button className="text-white">
                    <TbArrowFork className="lg:w-5 lg:h-5 w-3 h-3" />
                  </button>
                </div> */}
              <div className="flex flex-row items-center justify-center space-x-1">
                {/* <div className="lg:flex hidden flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-3 py-2">
                    <button className="text-white">
                      <LuRefreshCw className="lg:w-5 lg:h-5 w-3 h-3" />
                    </button>
                    <div>
                      <p className="text-white text-base font-medium">{item.likes}k</p>
                    </div>
                  </div>
                  <div>
                    <PopoverMenu
                      position="right"
                      trigger={
                        <button>
                          <BsThreeDotsVertical className="lg:w-6 mt-2 lg:h-6 w-4 h-4" color="white" />
                        </button>
                      }
                      options={[
                        { label: 'Share', onClick: () => console.log('Trending') },
                        { label: 'Embed', onClick: () => console.log('Newest') },
                      ]}
                    />
                  </div> */}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 flex w-full flex-row items-center justify-between space-x-0 pb-3">
              <div className="max-w-auto px-3 lg:max-w-[60%] xl:max-w-[60%] 2xl:max-w-[70%]">
                <UserAvatar
                  username={Cookies.get('username')}
                  isVerified={true}
                  size="xs"
                />
              </div>
              <div className="px-3">
                {/* <div className="flex flex-row items-center space-x-2 backdrop-blur-sm bg-white/25 rounded-full px-3 py-2">
                    <button className="text-white">
                      <FaRegThumbsUp className="lg:w-5 lg:h-5 w-3 h-3" />
                    </button>
                    <button className="text-white">
                      <LuRefreshCw className="lg:w-5 lg:h-5 w-3 h-3" />
                    </button>
                  </div> */}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CollectionItem;
