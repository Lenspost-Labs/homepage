import { Float } from '@headlessui-float/react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import React, { Fragment } from 'react'

export interface MenuItem {
	label: string
	href?: string
	onClick?: () => void
}

interface Props {
	trigger: JSX.Element | string
	options: MenuItem[]
	position?: 'left' | 'right'
	mobilePosition?: 'left' | 'right'
}

function PopoverMenu({ trigger, options, mobilePosition, position = 'left' }: Props) {
	return (
		<>
			<Popover className="relative">
				<Float strategy="absolute" as="div" shift={true} autoPlacement={true}>
					<Popover.Button className="inline-flex text-xl w-full items-center justify-center font-semibold focus:outline-none focus-visible:ring-0">
						{trigger}
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="z-10 mt-2 w-36 lg:w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
							<div className="overflow-hidden px-1 py-1 ">
								{options.map((link) => (
									/* Use the `active` state to conditionally style the active item. */
									<Fragment key={link.label}>
										{link?.onClick ? (
											<button onClick={link.onClick} className="group bg-white text-black group flex w-full items-center rounded-md px-2 py-2">
												{link.label}
											</button>
										) : (
											<a href={link.href} className="group flex w-full items-center rounded-md px-2 py-2 bg-white text-black">
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
	)
}

export default PopoverMenu
