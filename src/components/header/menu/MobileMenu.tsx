import { LENSPOST_APP_URL, MENU_ITEMS } from '@/data';
import { IoGiftOutline } from 'react-icons/io5';
import { Transition } from '@headlessui/react';
import { FaPlus } from 'react-icons/fa6';
import { Fragment, FC } from 'react';
import Link from 'next/link';

interface Props {
  setShow: (show: boolean) => void;
  show: boolean;
}

const MobileMenu: FC<Props> = ({ setShow, show }) => {
  return (
    <div className="absolute inset-0 h-full">
      <Transition
        leave="transform duration-200 transition ease-in-out"
        enter="transform transition duration-[400ms]"
        leaveFrom="opacity-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveTo="opacity-0"
        as={Fragment}
        show={show}
      >
        <div
          className="fixed inset-0 z-[1000] bg-gradient-to-r from-black px-5 py-20"
          onClick={() => setShow(!show)}
        >
          <div className="flex flex-col space-y-4">
            {MENU_ITEMS.map((item, index) => (
              <Link
                className="relative z-[1000] text-3xl font-medium text-white"
                onClick={() => setShow(!show)}
                href={item.link}
                key={index}
              >
                <span className="text-3xl font-medium text-white">
                  {item.text}
                </span>
              </Link>
            ))}
            <div className="py-2" />
            <Link
              className="relative z-[1000] flex flex-row items-center space-x-3"
              onClick={() => setShow(!show)}
              href={LENSPOST_APP_URL}
            >
              <FaPlus className="h-6 w-6 text-white" />
              <span className="text-3xl font-medium text-white">Create</span>
            </Link>
            <Link
              className="relative z-[1000] flex flex-row items-center space-x-3"
              onClick={() => setShow(!show)}
              href="/"
            >
              <IoGiftOutline className="h-6 w-6 text-white" />
              <span className="text-3xl font-medium text-white">Rewards</span>
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default MobileMenu;
