import Collections from '@/components/collections';
import { tabs } from '@/lib/Constants';
import { CollectionsData } from '@/lib/data';
import React from 'react';

function Raveshop() {
  return (
    <>
      <div className="flex flex-col items-start space-y-5 px-5 pb-5 pt-28 lg:space-y-10 lg:px-20 lg:pb-20 lg:pt-36">
        <RaveshopInfo />
        <Collections
          withTabs={true}
          tabs={tabs}
          data={CollectionsData}
          isTabStyle={true}
        />
      </div>
    </>
  );
}

export default Raveshop;

const RaveshopInfo = () => {
  return (
    <>
      <div className="flex flex-col space-y-3 lg:space-y-5">
        <h2 className="text-3xl font-bold lg:text-5xl">Raveshop</h2>
        <p className="text-xl font-medium lg:text-3xl">
          Redeem your $POSTER Tokens
        </p>
      </div>
    </>
  );
};
