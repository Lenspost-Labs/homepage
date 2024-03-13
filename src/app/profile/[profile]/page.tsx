import PageHeader from '@/components/PageHeader'
import UserInfo from '@/components/UserInfo'
import UserCollections from '@/components/collections/UserCollections'
import Image from 'next/image'

function Page({ params }: { params: { profile: string } }) {
	return (
		<>
			<PageHeader backgroundImage="/cover2.png" />
			<div className="relative flex items-center lg:justify-start justify-center flex-col">
				<div className="flex flex-col absolute lg:-top-28 -top-20 px-5 lg:px-20">
					<div className="lg:w-52 lg:h-52 lg:border-8 w-40 h-40 border-4 border-theme-light-purple-50 relative overflow-hidden rounded-3xl">
						<Image src="https://images.unsplash.com/photo-1517849845537-4d257902454a" alt="Profile Picture" className="rounded-2xl" fill />
					</div>
				</div>
			</div>
			<UserInfo />
			<UserCollections />
		</>
	)
}

export default Page
