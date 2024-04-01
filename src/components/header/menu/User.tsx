'use client'
import UserAvatar from '@/components/UserAvatar'
import { LinkButton } from '@/ui/LinkButton'
import { Transition } from '@headlessui/react'
import { MenuIcon, X } from 'lucide-react'
import React, { Fragment, useEffect,useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoGiftOutline } from 'react-icons/io5'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import axios from 'axios';
import {AuthEvmResponse, GetCanvasData, UserDetails} from '../../../../types/types';
import { useResponseStore } from '@/state/info'
import Cookies from 'js-cookie';
import { useToast } from "@/ui/use-toast"
import Link from 'next/link'

interface Props {
	isLoggedIn: boolean
	isLight: boolean
	showMenu: boolean;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function generateRandomUsername() {
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
  
	return `${randomAdjective}-${randomNoun}-${Math.floor(Math.random() * 1000)}`;
  }
  

function UserMenu({ isLoggedIn, isLight = true , showMenu, setShowMenu}: Props) {
	const {response , setResponse} = useResponseStore();
	const [randomUsername, setRandomUsername] = useState('');
	// const [showMenu, setShowMenu] = useState(false)
	const { openConnectModal } = useConnectModal();
	const { address, isConnected, isDisconnected } = useAccount();
	const [posterToken, setPosterToken] = useState<number | null>(null);
	const { disconnect } = useDisconnect();
	const { toast } = useToast();
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isConnected, address]);

	useEffect(() => {
		if (!isConnected) {
			Cookies.remove('jwt');
			Cookies.remove('username');
		}
	}, [isConnected]);

	useEffect(() => {
		if (isError && error?.name==="UserRejectedRequestError") {
			toast({
				title: "Login Failed ❌",
				variant:"destructive",
				description: "You have rejected the login request.",
			})
			
			disconnect();
			Cookies.remove('jwt');
		}
	  }
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	, [isError]);

	const sendSignatureToBackend = async () => {
		try {
		  const body = {
			evm_address: address,
			signature: data,
			message: "This message is to login you into lenspost dapp.",
		  };
	  
		  const response = await axios.post<AuthEvmResponse>(
			`${process.env.NEXT_PUBLIC_DEV_URL}/auth/evm`,
			body,
			{
			  headers: {
				'Content-Type': 'application/json',
			  },
			}
		  );
	  
		  console.log(response.data);
		  setResponse(response.data);
		  toast({
			title: "Login Successfull ✅",
			description: "You have successfully logged in.",
		  })
		  Cookies.set('jwt', response.data.jwt,{expires: 1});
		  Cookies.set('username', response.data.username);
		} catch (error) {
			toast({
				title: "Error ❌",
				variant:"destructive",
				description: "An error occurred while logging in.",
			})
		  console.error(error);
		}
	  };

	  useEffect(() => {
		const fetchPosterToken = async () => {
		  if (isConnected && address) {
			try {
			const jwtToken = Cookies.get('jwt');
			const res = await axios.get<UserDetails>(`${process.env.NEXT_PUBLIC_DEV_URL}/user/`, {
				headers: {
				  Authorization: `Bearer ${jwtToken}`,
				},
			});
	
			  if (res.data) {
				const userData = await res.data;
				setPosterToken(userData?.message.balance || null);
			  } else {
				console.error('Failed to fetch user data');
			  }
			} catch (error) {
			  console.error('Error fetching user data:', error);
			}
		  }
		};
	
		fetchPosterToken();
	  }, [isConnected, address]);

	  useEffect(() => {
		if (isConnected && address && data) {
		  sendSignatureToBackend();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [isConnected, address, data]);

	  useEffect(() => {
		const storedUsername = Cookies.get('username');
		if (storedUsername) {
		  setRandomUsername(storedUsername);
		} else {
		  const generatedUsername = generateRandomUsername();
		  setRandomUsername(generatedUsername);
		  Cookies.set('username', generatedUsername);
		}
	  }, []);

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
					href="https://app.lenspost.xyz/"
					icon={<FaPlus className="lg:w-4 lg:h-4 w-6 h-6" />}
				>
					<span className="text-xl font-semibold lg:block hidden">Create</span>
				</LinkButton>
				{isConnected ? (
					<Link href={response?.username ? `/profile/${response.username}` : `/profile/${randomUsername}`}>
						   <div className="group">
							<UserAvatar isVerified />
							</div>
					</Link>
					) : (
						openConnectModal && (
						<div className="group">
							<UserAvatar onClick={openConnectModal} isVerified />
						</div>
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
					<span className="text-xl font-semibold">{posterToken || '0'}</span>
				</LinkButton>
			</div>
			{showMenu && <MobileMenu show={showMenu} setShow={setShowMenu} />}
		</>
	)
}

export default UserMenu
