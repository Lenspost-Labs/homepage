'use client'
import Tabs from '@/ui/Tabs'
import React, { useState } from 'react'
import Collection, { CollectionType } from './Collection'

//import Dropdown from '@/ui/Dropdown'
import dynamic from 'next/dynamic'

const Dropdown = dynamic(() => import('../../ui/Dropdown'), { ssr: false })
import { ChevronDownIcon } from 'lucide-react'
import { CollectionsData } from '@/lib/data'
import {NFTDropdown} from '@/components/NFTDropdown'	
interface Props {
	withTabs: boolean
	tabs: string[]
	data: CollectionType[]
	isTabStyle?: boolean
}

const SortingDropdown = ({ active, setActive }: { active: string; setActive: (active: string) => void }) => {
	return (
		<div className="flex flex-row items-center">
			<Dropdown
				trigger={
					<>
						<button onClick={() => setActive(active)}>{active}</button>
						<ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
					</>
				}
				position="left"
				options={[
					{ label: 'Trending', onClick: () => setActive('Trending') },
					{ label: 'Newest', onClick: () => setActive('Newest') },
				]}
			/>
		</div>
	)
}

function Collections({ withTabs = true, tabs, data, isTabStyle = true }: Props) {
	const [activeTab, setActiveTab] = useState(tabs[0])
	const [activeSort, setActiveSort] = useState('Trending')
	const [selectedAddress, setSelectedAddress] = useState('');
	const AllCollection = CollectionsData.sort(() => Math.random() - 0.5)
	const CollectiblesCollection = AllCollection.sort(() => Math.random() - 0.5)
	const RemixCollection = CollectiblesCollection.sort(() => Math.random() - 0.5)
	const NFTsCollection = RemixCollection.sort(() => Math.random() - 0.5)
	const BackgroundsCollection = NFTsCollection.sort(() => Math.random() - 0.5)
	const TemplatesCollection = BackgroundsCollection.sort(() => Math.random() - 0.5)
	const StickersCollection = TemplatesCollection.sort(() => Math.random() - 0.5)
	const handleAddressChange = (address: string) => {
		setSelectedAddress(address);
	  };
	return (
		<>
			<div className="flex flex-col w-full items-start space-y-6">
				<div className="flex flex-col w-full items-start space-y-6 lg:space-y-10">
					{withTabs ? (
						<>
							<div className="flex flex-col w-full flex-1 items-start space-y-6">
							<div className="flex flex-row lg:divide-x lg:divide-black items-center lg:justify-start justify-between w-full space-x-5">
								<SortingDropdown active={activeSort} setActive={setActiveSort} />
								<div className="flex items-center lg:space-x-5 space-x-2">
									<div className="lg:block hidden">
										<Tabs tabs={tabs} active={activeTab} setActive={setActiveTab} isTabStyle={isTabStyle} />
									</div>
									{activeTab === 'CC0' && (
										<div className="lg:block lg:px-5  hidden">
											<NFTDropdown onAddressChange={handleAddressChange} />
										</div>
									)}
									<div className="lg:hidden flex items-center">
										<Dropdown
											trigger={
												<>
													<button onClick={() => setActiveTab(activeTab)}>{activeTab}</button>
													<ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
												</>
											}
											position="right"
											mobilePosition="right"
											options={tabs.map((tab) => ({ label: tab, onClick: () => setActiveTab(tab) }))}
										/>
										{activeTab === 'CC0' && (
										<div className="">
											<NFTDropdown onAddressChange={handleAddressChange} />
										</div>
									)}
									</div>
								</div>
							</div>

								{!isTabStyle && <div className="border-t border-theme-light-purple-50 flex w-full h-1"></div>}
							</div>
							<>
								{activeTab === 'All' && <Collection tab={activeTab} collection={AllCollection} selectedAddress={selectedAddress} />}
								{/* {activeTab === 'Collectibles' && <Collection tab={activeTab} collection={CollectiblesCollection} />} */}
								{activeTab === 'Remix' && <Collection tab={activeTab} collection={RemixCollection} selectedAddress={selectedAddress} />}
								{activeTab === 'CC0' && <Collection tab={activeTab} collection={NFTsCollection} selectedAddress={selectedAddress} />}
								{activeTab === 'Backgrounds' && <Collection tab={activeTab} collection={BackgroundsCollection}  selectedAddress={selectedAddress}/>}
								{activeTab === 'Templates' && <Collection tab={activeTab} collection={TemplatesCollection}  selectedAddress={selectedAddress}/>}
								{activeTab === 'Stickers' && <Collection tab={activeTab} collection={StickersCollection} selectedAddress={selectedAddress} />}
							</>
						</>
					) : (
						<div className="pt-3 lg:pt-6 w-full h-full">
							<div className="border-t border-theme-light-purple-50 lg:pb-10 pb-5 flex w-full h-1"></div>
							<Collection tab={'CC0'} collection={data}  selectedAddress={selectedAddress}/>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Collections
