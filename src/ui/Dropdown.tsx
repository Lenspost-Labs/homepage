import { Transition, Menu } from '@headlessui/react';
import { Fragment, FC } from 'react';
import { cn } from '@/utils';

export interface MenuItem {
  onClick?: () => void;
  href?: string;
  label: string;
}

interface Props {
  mobilePosition?: 'right' | 'left';
  trigger: JSX.Element | string;
  position?: 'right' | 'left';
  options: MenuItem[];
}

const Dropdown: FC<Props> = ({
  position = 'left',
  mobilePosition,
  options,
  trigger
}) => {
  return (
    <Menu className="relative z-10 inline-block text-left" as="div">
      <Menu.Button className="inline-flex w-full items-center justify-center text-xl font-semibold focus:outline-none focus-visible:ring-0">
        {trigger}
      </Menu.Button>
      <Transition
        leaveFrom="transform opacity-100 scale-100"
        enterTo="transform opacity-100 scale-100"
        enterFrom="transform opacity-0 scale-95"
        enter="transition ease-out duration-100"
        leave="transition ease-in duration-75"
        leaveTo="transform opacity-0 scale-95"
        as={Fragment}
      >
        <Menu.Items
          className={cn(
            'absolute z-50 mt-2 w-36 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none lg:w-56',
            {
              'lg:right-0': !mobilePosition && position === 'right',
              'lg:left-0': !mobilePosition && position === 'left',
              'right-0': mobilePosition === 'right',
              'left-0': mobilePosition === 'left'
            }
          )}
          static
        >
          <div className="px-1 py-1 ">
            {options.map((link) => (
              /* Use the `active` state to conditionally style the active item. */
              <Menu.Item key={link.label} as={Fragment}>
                {({ active }) =>
                  link?.onClick ? (
                    <button
                      className={`group flex w-full items-center rounded-md px-2 py-2 ${
                        active
                          ? 'bg-[#2C346B14] text-[#2C346B]'
                          : 'group flex w-full items-center rounded-md bg-white px-2 py-2 text-black'
                      }`}
                      onClick={link.onClick}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      className={`group flex w-full items-center rounded-md px-2 py-2 ${
                        active
                          ? 'bg-theme-light-purple-50 text-theme-purple'
                          : 'bg-white text-black '
                      }`}
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  )
                }
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
