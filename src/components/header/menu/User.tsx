'use client'
import UserAvatar from '@/components/UserAvatar'
import { LinkButton } from '@/ui/LinkButton'
import { Transition } from '@headlessui/react'
import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment, useEffect,useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoGiftOutline } from 'react-icons/io5'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import axios from 'axios';
import {AuthEvmResponse} from '../../../../types/types';
import { useResponseStore } from '@/state/info'
import Cookies from 'js-cookie';

interface Props {
	isLoggedIn: boolean
	isLight: boolean
	showMenu: boolean
	setShowMenu: (showMenu: boolean) => void
}

function UserMenu({ isLoggedIn, isLight = true , showMenu, setShowMenu}: Props) {
	const {response , setResponse} = useResponseStore();
	// const [showMenu, setShowMenu] = useState(false)
	const { openConnectModal } = useConnectModal();
	const { address, isConnected, isDisconnected } = useAccount();
	// const [response, setResponse] = useState<AuthEvmResponse | null>(null);
	const {
		data,
		isError,
		isSuccess,
		error,
		signMessage,
	} = useSignMessage();

	async function getSignature() {
		if (isDisconnected) return;
		const message = "This message is to login you into lenspost dapp.";
	
			const result =  signMessage({ message });
			
			console.log("Signature:", result);
	}
	
	useEffect(() => {
		if (isConnected && address) {
			getSignature();
		}
	}, [isConnected, address]);

	const sendSignatureToBackend = async () => {
		try {
		  const body = {
			evm_address: '0x0CF97e9C28C5b45C9Dc20Dd8c9d683E0265190CB',
			signature: "0x17b895d461abb4294ec304035dc9145459e6498a47d7acdf2813eccf3000da033a3ba1d1e02d48521445a75dd6e11739dfd9934cbd6a2a7492355003804044a31b",
			message: "This message is to login you into lenspost dapp.",
		  };
	  
		  const response = await axios.post<AuthEvmResponse>(
			'https://lenspost-development.up.railway.app/auth/evm',
			body,
			{
			  headers: {
				'Content-Type': 'application/json',
			  },
			}
		  );
	  
		  console.log(response.data);
		  setResponse(response.data);
		  Cookies.set('jwt', response.data.jwt);
		  Cookies.set('username', response.data.username);
		} catch (error) {
		  console.error(error);
		}
	  };

	  useEffect(() => {
		if (isConnected && address && data) {
		  sendSignatureToBackend();
		}
	  }, [isConnected, address, data]);

	  function generateRandomUsername() {
		const storedUsername = Cookies.get('username');
 		 if (storedUsername) {
   			 return storedUsername;
  		  }
		const adjectives = [
		  'awesome',
		  'cool',
		  'amazing',
		  'fantastic',
		  'incredible',
		  'beautiful',
		  'wonderful',
		];
		const nouns = ['user', 'friend', 'person', 'buddy', 'pal'];
	  
		const randomAdjective =
		  adjectives[Math.floor(Math.random() * adjectives.length)];
		const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
	  
		return `${randomAdjective}-${randomNoun}-${Math.floor(
		  Math.random() * 1000
		)}`;
	  }

	console.log("isConnected", isConnected)
	console.log(address)
	console.log("Signature it is",data)
	console.log("Error signature",error)
	return (
		<>
			<div className="flex flex-row justify-end items-center space-x-4 lg:space-x-6">
				<LinkButton
					className="!p-2 lg:!px-4 lg:!py-[8px] lg:!flex !hidden"
					outline={true}
					variant={isLight ? 'invert' : 'purple'}
					href="/"
					icon={<FaPlus className="lg:w-4 lg:h-4 w-6 h-6" />}
				>
					<span className="text-xl font-semibold lg:block hidden">Create</span>
				</LinkButton>
				{isConnected ? (
					 <UserAvatar
					 href={
					   response?.username
						 ? `/profile/${Cookies.get('username')}`
						 : `/profile/${generateRandomUsername()}`
					 }
					 isVerified
				   />
				) : (openConnectModal && (
					<UserAvatar onClick={openConnectModal} isVerified />
				)
				)}
				<div className="lg:hidden block relative z-40">
					<button
						onClick={() => setShowMenu(!showMenu)}
						className={cn('p-2 rounded-full border', { 'border-white': isLight, 'border-theme-light-purple': !isLight })}
					>
						{!showMenu ? (
							<MenuIcon size={24} className={cn({ 'text-white': isLight, 'text-theme-light-purple': !isLight })} />
						) : (
							<X size={24} className={cn({ 'text-white': isLight, 'text-theme-light-purple': !isLight })} />
						)}
					</button>
				</div>
				<LinkButton className="lg:flex hidden" outline={true} variant={isLight ? 'invert' : 'purple'} href="/" icon={<IoGiftOutline size={24} />}>
					<span className="text-xl font-semibold">168</span>
				</LinkButton>
			</div>
			{showMenu && <MobileMenu show={showMenu} setShow={setShowMenu} />}
		</>
	)
}

export default UserMenu
