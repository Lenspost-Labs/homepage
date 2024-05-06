import Collections from '@/components/collections';
import { CollectionsData } from '@/lib/data';
import { RaveshopInfo } from '@/components';
import { tabs } from '@/lib/Constants';
import React from 'react';

const Raveshop = () => {
  return (
    <>
      <div className="flex flex-col items-start space-y-5 px-5 pb-5 pt-28 lg:space-y-10 lg:px-20 lg:pb-20 lg:pt-36">
        <RaveshopInfo />
        <Collections
          data={CollectionsData}
          isTabStyle={true}
          withTabs={true}
          tabs={tabs}
        />
      </div>
    </>
  );
};

export default Raveshop;
