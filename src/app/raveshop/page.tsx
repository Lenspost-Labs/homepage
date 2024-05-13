import Collections from '@/components/collections';
import { COLLECTION_DATA, TABS } from '@/data';
import { RaveshopInfo } from '@/components';

const Raveshop = () => {
  return (
    <div className="flex flex-col items-start space-y-5 px-5 pb-5 pt-28 lg:space-y-10 lg:px-20 lg:pb-20 lg:pt-36">
      <RaveshopInfo />
      <Collections
        data={COLLECTION_DATA}
        isTabStyle={true}
        withTabs={true}
        tabs={TABS}
      />
    </div>
  );
};

export default Raveshop;
