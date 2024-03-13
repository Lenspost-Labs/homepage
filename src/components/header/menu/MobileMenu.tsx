import { MenuItems } from '@/lib/Constants'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { IoGiftOutline } from 'react-icons/io5'

interface Props {
	show: boolean
	setShow: (show: boolean) => void
}
function MobileMenu({ show, setShow }: Props) {
	return (
		<div className="absolute inset-0 z-30">
			<Transition
				show={show}
				as={Fragment}
				enter="transform transition duration-[400ms]"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transform duration-200 transition ease-in-out"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-gradient-to-r from-black z-50 px-5 py-20" onClick={() => setShow(!show)}>
					<>
						<div className="flex flex-col space-y-4">
							{MenuItems.map((item, index) => (
								<Link href={item.link} key={index} onClick={() => setShow(!show)} className="text-3xl text-white font-medium">
									<span className="text-3xl text-white font-medium">{item.text}</span>
								</Link>
							))}
							{/* <Link href="/" className="flex flex-row items-center">
								<span className="text-3xl text-white font-medium">Feed</span>
							</Link>
							<Link href="/" className="flex flex-row items-center">
								<span className="text-3xl text-white font-medium">Raveshop</span>
							</Link> */}
							<div className="py-2"></div>
							<Link href="/" className="flex flex-row items-center space-x-3">
								<FaPlus className="text-white w-6 h-6" />
								<span className="text-3xl text-white font-medium">Create</span>
							</Link>
							<Link href="/" className="flex flex-row items-center space-x-3">
								<IoGiftOutline className="text-white w-6 h-6" />
								<span className="text-3xl text-white font-medium">Rewards</span>
							</Link>
						</div>
					</>
				</div>
			</Transition>
		</div>
	)
}

export default MobileMenu
