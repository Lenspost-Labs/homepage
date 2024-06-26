import { Collections, PageHeader } from '@/components';
import { COLLECTION_DATA, TABS } from '@/data';

export default function Home() {
  return (
    <>
      <PageHeader
        // backgroundImages={[1, 2].map(
        //   (i) =>
        //     `https://ik.imagekit.io/quackmagic/homepage-banners/${i}.${`png` || `jpg` || `gif`} `
        // )}
        backgroundImages={['/3.png', '/cover1.jpg']}
        isCollection
        isFeatured
        title=""
      />
      <div className="flex flex-col px-5 py-5 lg:px-20 lg:py-10">
        <div className="py-1.5">
          <Collections
            data={COLLECTION_DATA}
            isTabStyle={true}
            withTabs={true}
            tabs={TABS}
          />
        </div>
      </div>
    </>
  );
}
