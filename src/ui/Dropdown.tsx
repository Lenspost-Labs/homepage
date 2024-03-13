import { Fragment, forwardRef } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

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

function Dropdown({ trigger, options, mobilePosition, position = 'left' }: Props) {
	return (
		<>
			<Menu as="div" className="relative z-10 inline-block text-left">
				<Menu.Button className="inline-flex text-xl w-full items-center justify-center font-semibold focus:outline-none focus-visible:ring-0">
					{trigger}
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items
						className={cn(
							'absolute z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none',
							{
								'md:left-0': !mobilePosition && position === 'left',
								'md:right-0': !mobilePosition && position === 'right',
								'left-0': mobilePosition === 'left',
								'right-0': mobilePosition === 'right',
							}
						)}
					>
						<div className="px-1 py-1 ">
							{options.map((link) => (
								/* Use the `active` state to conditionally style the active item. */
								<Menu.Item key={link.label} as={Fragment}>
									{({ active }) =>
										link?.onClick ? (
											<button
												onClick={link.onClick}
												className={`group flex w-full items-center rounded-md px-2 py-2 ${
													active ? 'bg-theme-light-purple-50 text-theme-purple' : 'bg-white text-black group flex w-full items-center rounded-md px-2 py-2'
												}`}
											>
												{link.label}
											</button>
										) : (
											<a
												href={link.href}
												className={`group flex w-full items-center rounded-md px-2 py-2 ${
													active ? 'bg-theme-light-purple-50 text-theme-purple' : 'bg-white text-black '
												}`}
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
		</>
	)
}

export default Dropdown
