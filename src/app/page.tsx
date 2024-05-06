import { Collections, PageHeader } from '@/components';
import { COLLECTION_DATA, TABS } from '@/data';

import BackgroundImg from '../../public/cover1.jpg';

const Home = () => {
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImg}
        isCollection
        isFeatured
        title=""
      />
      <div className="flex flex-col px-5 py-5 lg:px-20 lg:py-10">
        <div className="py-1.5">
          <Collections data={COLLECTION_DATA} withTabs={true} tabs={TABS} />
        </div>
      </div>
    </>
  );
};

export default Home;
