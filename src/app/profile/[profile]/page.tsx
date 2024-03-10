import PageHeader from '@/components/PageHeader'
import UserInfo from '@/components/UserInfo'
import UserCollections from '@/components/collections/UserCollections'
import Image from 'next/image'

function Page({ params }: { params: { profile: string } }) {
	return (
		<>
			<PageHeader backgroundImage="/cover2.png" />
			<div className="relative flex flex-col">
				<div className="flex flex-col absolute -top-28 px-20">
					<div className="w-52 h-52 border-8 border-theme-light-purple-50 relative overflow-hidden rounded-3xl">
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
