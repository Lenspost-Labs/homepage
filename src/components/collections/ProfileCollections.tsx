'use client';

import { COLLECTION_DATA } from '@/data';
import { useState, FC } from 'react';
import Tabs from '@/ui/Tabs';

import Collections from '.';

interface ProfileCollectionsProps {
  tabs: string[];
}

const ProfileCollections: FC<ProfileCollectionsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState('Gallery');

  return (
    <div className="flex w-full flex-col space-y-4 py-5 lg:space-y-6">
      <div className="mb-2 flex flex-row items-center space-x-4">
        <Tabs
          className="!lg:text-2xl !text-lg"
          tabs={['Gallery', 'Rewards']}
          setActive={setActiveTab}
          active={activeTab}
        />
      </div>
      <div className="flex h-full w-full flex-1">
        {activeTab === 'Gallery' && (
          <Collections
            data={COLLECTION_DATA}
            isTabStyle={false}
            withTabs={true}
            tabs={tabs}
          />
        )}
        {activeTab === 'Rewards' && (
          <div className="mx-auto flex h-full flex-col items-center justify-center">
            <Collections
              data={COLLECTION_DATA}
              isTabStyle={false}
              withTabs={false}
              tabs={tabs}
            />
            <p className="gradient-text text-center text-xl font-bold lg:text-2xl">
              Coming Soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCollections;
