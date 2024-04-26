import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuRefreshCw } from 'react-icons/lu'
import { TbArrowFork } from 'react-icons/tb'
import { FaRegThumbsUp } from 'react-icons/fa'
import PopoverMenu from '@/ui/Popover'
import useNextBlurhash from 'use-next-blurhash'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import UserAvatar from '../UserAvatar'
import Cookies from 'js-cookie'
import { cn } from '@/lib/utils'

function CollectionItem({ item, username, tab }: any) {
  const [isGif, setIsGif] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

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
      if ('data' in item) [width, height] = [item?.data.width || 1080, item?.data.height || 1080];
      else if ('dimensions' in item) [width, height] = item.dimensions;
    } else if (tab === 'CC0') {
      imageSrc = item?.imageURL;
    } else if (tab === 'NFTs') {
      imageSrc = item?.permaLink || item;
    } else if (tab === 'Degen' || tab === 'Chicken' || tab === 'Collections') {
      imageSrc = item.imageLink[0];
      if ('data' in item) [width, height] = [item?.data?.width || 1080, item?.data?.height || 1080];
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
        src={imageSrc}
        alt={item.title || ''}
        unoptimized={isGif}
        width={width}
        height={height}
        quality={80}
        sizes="100vw"
        loading="lazy"
        className="rounded-xl object-cover w-full"
        onError={handleImageError}
      />
    );
  };

  const isRemix = tab === 'Remix' && item.ipfsLink && item.ipfsLink.length > 0
  const isRemixSpace = tab === 'Remix ' && item?.image;
  const isFarcaster = (tab === 'Chicken' || tab === 'Degen') && item.platform === 'farcaster'

  return (
    <>
      {(isFarcaster || isRemix) && (
        <Link href={isRemix ? `https://app.poster.fun/?slugId=${item?.slug?.[0]}` : `https://warpcast.com/~/conversations/${item?.txHash}`} target="blank">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            className="relative border-2 lg:border-4 w-full group bg-theme-light-purple-50 border-theme-light-purple-50 p-1 lg:p-2 rounded-2xl"
          >
            {renderImage()}
            <div className={cn('absolute inset-0 group-hover:opacity-100 opacity-0 duration-100 bg-black/25 p-3 m-1 lg:m-2 rounded-xl')}>
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
              <div className="flex flex-row w-full absolute bottom-0 left-0 pb-3 justify-between items-center space-x-0">
                <div className="px-3 max-w-auto xl:max-w-[60%] lg:max-w-[60%] 2xl:max-w-[70%]">
                  <UserAvatar isVerified={true} username={isFarcaster ? item.ownerId : username} href={`/profile/${isFarcaster ? item.ownerId : username}`} size="xs" />
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
     {(isRemixSpace) && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="relative border-2 lg:border-4 w-full group bg-theme-light-purple-50 border-theme-light-purple-50 p-1 lg:p-2 rounded-2xl"
        >
          {renderImage()}
          <div className={cn('absolute inset-0 group-hover:opacity-100 opacity-0 duration-100 bg-black/25 p-3 m-1 lg:m-2 rounded-xl')}>
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
            <div className="flex flex-row w-full absolute bottom-0 left-0 pb-3 justify-between items-center space-x-0">
              <div className="px-3 max-w-auto xl:max-w-[60%] lg:max-w-[60%] 2xl:max-w-[70%]">
                <UserAvatar isVerified={true} username={Cookies.get('username')} size="xs" />
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
  )
}

export default CollectionItem