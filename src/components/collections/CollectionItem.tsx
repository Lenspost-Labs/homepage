'use client';

import {
  LENSPOST_APP_URL,
  CDN_IMAGE_URL,
  CDN_IPFS_URL,
  S3_IMAGE_URL
} from '@/data';
import { AssetsByCampaign, CollectionAssets, PublicAssets } from '@/types';
import { UserAvatar } from '@/components';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils';
import { FC } from 'react';

interface CollectionItemProps {
  item: AssetsByCampaign & CollectionAssets & PublicAssets;
  username: any;
  tab: string;
}

const CollectionItem: FC<CollectionItemProps> = ({ username, item, tab }) => {
  const imageCdbUrl = item?.imageLink[0]?.replace(S3_IMAGE_URL, CDN_IMAGE_URL);
  const ipfsCdUrl = CDN_IPFS_URL + '/' + item?.ipfsLink[0];

  const isUserPage =
    (tab === 'Remix ' && item?.image) || tab === 'Collections ';
  const isFarcaster = item.platform === 'farcaster';
  const isRemix = tab === 'Remix';

  return (
    <>
      {(isFarcaster || isRemix) && (
        <Link
          href={
            isRemix
              ? `${LENSPOST_APP_URL}/?slugId=${item?.slug[0]}`
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
            <Image
              className="w-full rounded-xl object-cover"
              src={imageCdbUrl || ipfsCdUrl}
              loading="lazy"
              height={1080}
              width={1920}
              quality={10}
              alt="image"
            />
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
          <Image
            className="w-full rounded-xl object-cover"
            src={imageCdbUrl || ipfsCdUrl}
            loading="lazy"
            height={1080}
            width={1920}
            quality={10}
            alt="image"
          />
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
