import { UserCollections, PageHeader, UserInfo } from '@/components';
import Image from 'next/image';

const Page = () => {
  return (
    <>
      <PageHeader backgroundImage="/cover2.png" />
      <div className="relative flex flex-col items-center justify-center lg:items-start lg:justify-start">
        <div className="absolute -top-20 flex flex-col px-5 lg:-top-28 lg:px-20">
          <div className="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-theme-light-purple-50 lg:h-52 lg:w-52 lg:border-8">
            <Image
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
              className="rounded-2xl"
              alt="Profile Picture"
              fill
            />
          </div>
        </div>
      </div>
      <UserInfo />
      <UserCollections />
    </>
  );
};

export default Page;
