'use client';

import { COLLECTION_DATA, CAMPAIGN_DATA } from '@/data';
import React, { useState, FC } from 'react';
import Accordions from '@/ui/Accordions';
import { TABS } from '@/data';
import Tabs from '@/ui/Tabs';

import Collections from './collections';

const UserCollections: FC = () => {
  const [activeTab, setActiveTab] = useState('Assets');
  return (
    <div className="flex flex-col space-y-4 py-8 lg:space-y-6 lg:py-10">
      <div className="mb-2 flex flex-row items-center space-x-4 px-5 lg:px-20">
        <Tabs
          className="!lg:text-2xl !text-lg"
          tabs={['Assets', 'Campaigns']}
          setActive={setActiveTab}
          active={activeTab}
        />
      </div>
      <div className="flex h-full w-full flex-1 px-5 lg:px-20">
        {activeTab === 'Assets' && (
          <Collections
            data={COLLECTION_DATA}
            isTabStyle={false}
            withTabs={true}
            tabs={TABS}
          />
        )}
        {activeTab === 'Campaigns' && (
          <div className="max-w-7xl flex-col space-y-3 py-3 lg:space-y-6 lg:py-6">
            <div className="flex h-1 w-full border-t border-theme-light-purple-50 pb-5 lg:pb-10" />
            <div>
              <Accordions accordions={CAMPAIGN_DATA} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCollections;
