import { Disclosure, Transition } from '@headlessui/react'
import { CheckCircle, CheckIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react'
import React from 'react'
import { LuRefreshCw } from 'react-icons/lu'

interface Accordion {
	title: string
	content: string
	isCompleted?: boolean
}

interface Props {
	accordions: Accordion[]
}

function Accordions({ accordions }: Props) {
	return (
		<>
			{accordions.map((item, index) => {
				return (
					<>
						<Disclosure as="div" className="mb-5">
							{({ open }) => (
								<>
									<Disclosure.Button className="flex flex-row w-full justify-between rounded-2xl bg-theme-light-purple-50 px-4 py-4 text-left text-base md:text-xl font-medium  hover:bg-theme-light-purple items-center focus:outline-none focus-visible:ring focus-visible:ring-theme-light-purple/75">
										<div className="flex-1 flex flex-row items-center space-x-4">
											<ChevronRightIcon className={`${open ? 'rotate-90 transform' : ''} h-5 w-5 `} />
											<span>{item?.title}</span>
										</div>
										<button>
											{item?.isCompleted ? <CheckCircle size={22} className="text-black" /> : <LuRefreshCw size={22} className="text-gray-500" />}
										</button>
									</Disclosure.Button>
									<Disclosure.Panel className="px-4 pt-6 pb-10 text-base">{item?.content}</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					</>
				)
			})}
		</>
	)
}

export default Accordions
