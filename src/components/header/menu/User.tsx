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
import { useRouter } from 'next/navigation';


interface Props {
	isLoggedIn: boolean
	isLight: boolean
	showMenu: boolean;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

  
function UserMenu({ isLoggedIn, isLight = true , showMenu, setShowMenu}: Props) {
	const {response , setResponse} = useResponseStore();
	// const [showMenu, setShowMenu] = useState(false)
	const { openConnectModal } = useConnectModal();
	const { address, isConnected, isDisconnected } = useAccount();
	const [posterToken, setPosterToken] = useState<number | null>(null);
	const { disconnect } = useDisconnect();
	const { toast } = useToast();
	const router = useRouter();
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
	  const clearCookies = () => {
		const jwtToken = Cookies.get('jwt');
		if (jwtToken === undefined) return;
		const jwtExpiration = 24 * 60 * 60 * 1000; 
		const jwtTimestamp = Cookies.get('jwtTimestamp');
		const currentTimestamp = new Date().getTime();
		if (jwtTimestamp && currentTimestamp - parseInt(jwtTimestamp, 10) > jwtExpiration) {
		  Cookies.remove('jwt');
		  Cookies.remove('userId');
		  Cookies.remove('username');
		  Cookies.remove('jwtTimestamp');
		  console.log("session expired");
		  toast({
			title: "Session Expired",
			description: "Your session has expired. Please connect your wallet again",
			variant: "destructive",
		  });
		}
	  };

	  const interval = setInterval(clearCookies, 15 * 1000);

	  return () => clearInterval(interval); 

	}, []);
	useEffect(() => {
		if (isConnected && address) {
			getSignature();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isConnected, address]);

	const handleProfileClick = () => {
		const username = Cookies.get('username');
		if (username) {
		  router.push(`/profile/${username}`);
		}
	  };


	useEffect(() => {
		if (isError && error?.name==="UserRejectedRequestError") {
			toast({
				title: "Login Failed ❌",
				variant:"destructive",
				description: "You have rejected the login request.",
			})
			
			disconnect();
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
		  toast({
			title: "Login Successfull ✅",
			description: "You have successfully logged in.",
		  })
		  Cookies.set('jwt', response.data.jwt,{expires: 1});
		  Cookies.set('userId', response.data.userId,{expires: 1});
		  const currentTimestamp = new Date().getTime();
		  Cookies.set('jwtTimestamp', currentTimestamp.toString(), { expires: 1 });

		  if (response.data.username === "") {
			Cookies.set('username', address,{expires: 1});
		  } else {
			Cookies.set('username', response.data.username,{expires: 1});
		  }
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
	  const jwtToken = Cookies.get('jwt');

	console.log("isConnected", isConnected)
	console.log(address)
	console.log("Signature it is",data)
	console.log("Error signature",error)
	console.log("Here is jwt",jwtToken)
	return (
		<>
			<div className="flex flex-row justify-end items-center space-x-4 lg:space-x-6">
				<LinkButton
					className="!p-2 lg:!px-4 lg:!py-[8px] lg:!flex !hidden"
					outline={true}
					variant={isLight ? 'invert' : 'green'}
					href="https://app.lenspost.xyz/"
					icon={<FaPlus className="lg:w-4 lg:h-4 w-6 h-6" />}
				>
					<span className="text-xl font-semibold lg:block hidden">Create</span>
				</LinkButton>
				{jwtToken===undefined ? (
						<div className="group">
						   <UserAvatar onClick={openConnectModal} isVerified />
					   </div>	
					) : (
						
						<div className="group">
						<UserAvatar onClick={handleProfileClick} isVerified />
						</div>
						
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
				<LinkButton className="lg:flex hidden" outline={true} variant={isLight ? 'invert' : 'green'} href="/" icon={<IoGiftOutline size={24} />}>
					<span className="text-xl font-semibold">{posterToken || '0'}</span>
				</LinkButton>
			</div>
			{showMenu && <MobileMenu show={showMenu} setShow={setShowMenu} />}
		</>
	)
}

export default UserMenu
