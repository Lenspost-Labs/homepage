'use client';

import { ProfileNFTDropdown, StickerDropdown, NFTDropdown } from '@/components';
import { ChevronDownIcon } from 'lucide-react';
import { COLLECTION_DATA } from '@/data';
import { CollectionType } from '@/types';
import { useState, FC } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from '@/ui';

import Collection from './Collection';

const Dropdown = dynamic(() => import('../../ui/Dropdown'), { ssr: false });

interface CollectionsProps {
  isProfilePage?: boolean;
  data: CollectionType[];
  isTabStyle?: boolean;
  withTabs: boolean;
  tabs: string[];
}

const SortingDropdown = ({
  setActive,
  active
}: {
  setActive: (active: string) => void;
  active: string;
}) => {
  return (
    <div className="flex flex-row items-center">
      <Dropdown
        trigger={
          <>
            <button onClick={() => setActive(active)}>{active}</button>
            <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
          </>
        }
        options={[
          { onClick: () => setActive('Trending'), label: 'Trending' },
          { onClick: () => setActive('Newest'), label: 'Newest' }
        ]}
        position="left"
      />
    </div>
  );
};

const Collections: FC<CollectionsProps> = ({
  isTabStyle = true,
  withTabs = true,
  isProfilePage,
  tabs,
  data
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeSort, setActiveSort] = useState('Trending');
  const [selectedAddress, setSelectedAddress] = useState('');
  const AllCollection = COLLECTION_DATA.sort(() => Math.random() - 0.5);
  const CollectiblesCollection = AllCollection.sort(() => Math.random() - 0.5);
  const RemixCollection = CollectiblesCollection.sort(
    () => Math.random() - 0.5
  );
  const NFTsCollection = RemixCollection.sort(() => Math.random() - 0.5);
  const BackgroundsCollection = NFTsCollection.sort(() => Math.random() - 0.5);
  const TemplatesCollection = BackgroundsCollection.sort(
    () => Math.random() - 0.5
  );
  const StickersCollection = TemplatesCollection.sort(
    () => Math.random() - 0.5
  );
  const [stickerValue, setStickerValue] = useState('');
  const [profileNFTValue, setProfileNFTValue] = useState('1');

  const NftValue = (value: string) => {
    setProfileNFTValue(value);
  };
  const sticker = (value: string) => {
    setStickerValue(value);
  };
  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
  };
  return (
    <div className="flex w-full flex-col items-start space-y-6">
      <div className="flex w-full flex-col items-start space-y-6 lg:space-y-10">
        {withTabs ? (
          <>
            <div className="flex w-full flex-1 flex-col items-start space-y-6">
              <div className="flex w-full flex-row items-center justify-between space-x-5 lg:justify-start lg:divide-x lg:divide-black">
                <SortingDropdown
                  setActive={setActiveSort}
                  active={activeSort}
                />
                <div className="flex items-center space-x-2 lg:space-x-5">
                  <div className="hidden lg:block">
                    <Tabs
                      setActive={setActiveTab}
                      isTabStyle={isTabStyle}
                      active={activeTab}
                      tabs={tabs}
                    />
                  </div>

                  {activeTab === 'CC0' && (
                    <div className="hidden lg:block  lg:px-5">
                      <NFTDropdown onAddressChange={handleAddressChange} />
                    </div>
                  )}
                  {(activeTab === 'Stickers' ||
                    activeTab === 'Backgrounds') && (
                    <div className="hidden lg:block  lg:px-5">
                      <StickerDropdown onOptionChange={sticker} />
                    </div>
                  )}
                  {activeTab === 'NFTs ' && (
                    <div className="hidden lg:block  lg:px-5">
                      <ProfileNFTDropdown onOptionChange={NftValue} />
                    </div>
                  )}
                  <div className="flex items-center space-x-2 lg:hidden">
                    <div className="flex items-center">
                      <Dropdown
                        trigger={
                          <>
                            <button onClick={() => setActiveTab(activeTab)}>
                              {activeTab}
                            </button>
                            <ChevronDownIcon
                              className="ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </>
                        }
                        options={tabs.map((tab) => ({
                          onClick: () => setActiveTab(tab),
                          label: tab
                        }))}
                        mobilePosition="right"
                        position="right"
                      />
                      {activeTab === 'CC0' && (
                        <div className="ml-2">
                          <NFTDropdown onAddressChange={handleAddressChange} />
                        </div>
                      )}
                      {activeTab === 'NFTs ' && (
                        <div className="ml-2">
                          <ProfileNFTDropdown onOptionChange={NftValue} />
                        </div>
                      )}
                      {(activeTab === 'Stickers' ||
                        activeTab === 'Backgrounds') && (
                        <div className="ml-2">
                          <StickerDropdown onOptionChange={sticker} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {!isTabStyle && (
                <div className="flex h-1 w-full border-t border-theme-light-purple-50" />
              )}
            </div>
            <>
              {activeTab === 'All' && (
                <Collection
                  selectedAddress={selectedAddress}
                  isProfilePage={isProfilePage}
                  collection={AllCollection}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'Degen' && (
                <Collection
                  selectedAddress={selectedAddress}
                  isProfilePage={isProfilePage}
                  collection={AllCollection}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {/* {activeTab === 'Collectibles' && <Collection tab={activeTab} collection={CollectiblesCollection} />} */}
              {activeTab === 'Remix' && (
                <Collection
                  selectedAddress={selectedAddress}
                  isProfilePage={isProfilePage}
                  collection={RemixCollection}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'CC0' && (
                <Collection
                  selectedAddress={selectedAddress}
                  isProfilePage={isProfilePage}
                  collection={NFTsCollection}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'Backgrounds' && (
                <Collection
                  collection={BackgroundsCollection}
                  selectedAddress={selectedAddress}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'Templates' && (
                <Collection
                  selectedAddress={selectedAddress}
                  collection={TemplatesCollection}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'Stickers' && (
                <Collection
                  selectedAddress={selectedAddress}
                  collection={StickersCollection}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'NFTs ' && (
                <Collection
                  selectedAddress={selectedAddress}
                  collection={StickersCollection}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'NFTs' && (
                <Collection
                  selectedAddress={selectedAddress}
                  collection={StickersCollection}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'Collections ' && (
                <Collection
                  selectedAddress={selectedAddress}
                  collection={StickersCollection}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'Remix ' && (
                <Collection
                  selectedAddress={selectedAddress}
                  collection={StickersCollection}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'Chicken' && (
                <Collection
                  selectedAddress={selectedAddress}
                  collection={StickersCollection}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
              {activeTab === 'Gloom' && (
                <Collection
                  selectedAddress={selectedAddress}
                  collection={StickersCollection}
                  isProfilePage={isProfilePage}
                  nftValue={profileNFTValue}
                  sticker={stickerValue}
                  tab={activeTab}
                />
              )}
            </>
          </>
        ) : (
          <div className="h-full w-full pt-3 lg:pt-6">
            <div className="flex h-1 w-full border-t border-theme-light-purple-50 pb-5 lg:pb-10" />
            <Collection
              selectedAddress={selectedAddress}
              isProfilePage={isProfilePage}
              nftValue={profileNFTValue}
              sticker={stickerValue}
              collection={data}
              tab={'CC0'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
