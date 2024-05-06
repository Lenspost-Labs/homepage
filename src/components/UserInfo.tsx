'use client';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button } from '@/ui/Button';
import Dropdown from '@/ui/Dropdown';
import { FC } from 'react';

const UserInfo: FC = () => {
  return (
    <div className="mt-24 flex w-full flex-col items-center justify-center space-x-0 space-y-5 px-5 lg:mt-40 lg:flex-row lg:justify-between lg:space-x-20 lg:space-y-0 lg:px-20">
      <div className="flex flex-1 flex-col space-y-5 pr-0 lg:space-y-6 lg:pr-8">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold lg:text-6xl">Claynosaurz</h1>
          </div>
          <div className="mt-4 flex flex-row items-center justify-center space-x-4 lg:mt-0">
            <Button outline={true} title="Follow" />
            <Button title="0x2e...f6a3" outline={true} />
            <div>
              <Dropdown
                trigger={
                  <button>
                    <BsThreeDotsVertical color="black" size={28} />
                  </button>
                }
                options={[{ label: 'Share' }, { label: 'Embed' }]}
                mobilePosition="right"
                position="left"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-base font-medium lg:text-xl">
            Lorem ipsum dolor sit amet consectetur. Sagittis proin facilisis
            nisl dictumst laoreet morbi placerat luctus. Ut interdum tristique
            aliquam id nisi lorem vitae. Faucibus dictum eu qu.
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between space-x-5 lg:space-x-10">
        <div className="flex flex-col items-center justify-center space-y-1 lg:items-end lg:space-y-6">
          <p className="text-base font-semibold lg:text-2xl">Following</p>
          <p className="text-2xl font-bold lg:text-5xl">54</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 lg:items-end lg:space-y-6">
          <p className="text-base font-semibold lg:text-2xl">Followers</p>
          <p className="text-2xl font-bold lg:text-5xl">190K</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
