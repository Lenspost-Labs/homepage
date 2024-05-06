import React, { FC, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Float } from '@headlessui-float/react';

export interface MenuItem {
  onClick?: () => void;
  label: string;
  href?: string;
}

interface Props {
  mobilePosition?: 'left' | 'right';
  trigger: JSX.Element | string;
  position?: 'left' | 'right';
  options: MenuItem[];
}

const PopoverMenu: FC<Props> = ({ trigger, options }) => {
  return (
    <>
      <Popover className="relative">
        <Float strategy="absolute" offset={5} as="div" flip={true} shift={true}>
          <Popover.Button className="inline-flex w-full items-center justify-center text-xl font-semibold focus:outline-none focus-visible:ring-0">
            {trigger}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            enterTo="opacity-100 translate-y-0"
            enterFrom="opacity-0 translate-y-1"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="z-10 mt-3 w-36 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none lg:w-56">
              <div className="overflow-hidden px-1 py-1 ">
                {options.map((link) => (
                  /* Use the `active` state to conditionally style the active item. */
                  <Fragment key={link.label}>
                    {link?.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="group group flex w-full items-center rounded-md bg-white px-2 py-2 text-sm text-black hover:text-theme-purple lg:text-base"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="group flex w-full items-center rounded-md bg-white px-2 py-2 text-sm text-black hover:text-theme-purple lg:text-base"
                      >
                        {link.label}
                      </a>
                    )}
                  </Fragment>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Float>
      </Popover>
    </>
  );
};

export default PopoverMenu;
