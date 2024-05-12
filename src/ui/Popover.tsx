'use client';

import { Transition, Popover } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import React, { Fragment, FC } from 'react';

export interface MenuItem {
  onClick?: () => void;
  label: string;
  href?: string;
}

interface PopoverMenuProps {
  mobilePosition?: 'right' | 'left';
  trigger: JSX.Element | string;
  position?: 'right' | 'left';
  options: MenuItem[];
}

const PopoverMenu: FC<PopoverMenuProps> = ({ trigger, options }) => {
  return (
    <Popover className="relative">
      <Float strategy="absolute" shift={true} flip={true} offset={5} as="div">
        <Popover.Button className="inline-flex w-full items-center justify-center text-xl font-semibold focus:outline-none focus-visible:ring-0">
          {trigger}
        </Popover.Button>
        <Transition
          enter="transition ease-out duration-200"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          enterTo="opacity-100 translate-y-0"
          enterFrom="opacity-0 translate-y-1"
          leaveTo="opacity-0 translate-y-1"
          as={Fragment}
        >
          <Popover.Panel className="z-10 mt-3 w-36 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none lg:w-56">
            <div className="overflow-hidden px-1 py-1 ">
              {options.map((link) => (
                /* Use the `active` state to conditionally style the active item. */
                <Fragment key={link.label}>
                  {link?.onClick ? (
                    <button
                      className="group group flex w-full items-center rounded-md bg-white px-2 py-2 text-sm text-black hover:text-theme-purple lg:text-base"
                      onClick={link.onClick}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      className="group flex w-full items-center rounded-md bg-white px-2 py-2 text-sm text-black hover:text-theme-purple lg:text-base"
                      href={link.href}
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
  );
};

export default PopoverMenu;
