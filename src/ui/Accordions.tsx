import React,{FC} from 'react';
import { ChevronRightIcon, CheckCircle } from 'lucide-react';
import { Disclosure } from '@headlessui/react';
import { LuRefreshCw } from 'react-icons/lu';

interface Accordion {
  isCompleted?: boolean;
  content: string;
  title: string;
}

interface Props {
  accordions: Accordion[];
}

const Accordions: FC<Props> = ({ accordions }) => {
  return (
    <>
      {accordions.map((item, index) => (
        <Disclosure className="mb-5" key={index} as="div">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full flex-row items-center justify-between rounded-2xl bg-theme-light-purple-50 px-4 py-4 text-left text-base font-medium hover:bg-theme-light-purple focus:outline-none focus-visible:ring focus-visible:ring-theme-light-purple/75 lg:text-xl">
                <div className="flex flex-1 flex-row items-center space-x-4">
                  <ChevronRightIcon
                    className={`${open ? 'rotate-90 transform' : ''} h-5 w-5 `}
                  />
                  <span>{item?.title}</span>
                </div>
                <button>
                  {item?.isCompleted ? (
                    <CheckCircle className="text-black" size={22} />
                  ) : (
                    <LuRefreshCw className="text-gray-500" size={22} />
                  )}
                </button>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-10 pt-6 text-base">
                {item?.content}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};

export default Accordions;
