import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from 'lucide-react'
import React, { Fragment } from 'react'

interface Props {
	show: boolean
	setShow: (show: boolean) => void
	title?: string
	children?: React.ReactNode
}

function Modal({ show, setShow, title, children }: Props) {
	function closeModal() {
		setShow(false)
	}

	function openModal() {
		setShow(true)
	}
	return (
		<>
			<Transition appear show={show} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/70" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full flex flex-col space-y-3 max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
									{title && (
										<div className="flex flex-row items-center justify-between border-b border-gray-300 px-6 py-4 mb-3">
											<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
												{title}
											</Dialog.Title>
											<button onClick={closeModal}>
												<XIcon size={24} className="text-black" />
											</button>
										</div>
									)}
									<div className="px-6 pb-6">{children}</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default Modal
