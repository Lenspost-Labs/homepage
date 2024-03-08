'use client'
import Tabs from '@/ui/Tabs'
import React, { useState } from 'react'
import Collection, { CollectionType } from './Collection'

import Dropdown from '@/ui/Dropdown'
import { ChevronDownIcon } from 'lucide-react'
import { CollectionsData } from '@/lib/data'

interface Props {
	withTabs: boolean
	tabs: string[]
	data: CollectionType[]
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
				options={[
					{ label: 'Trending', onClick: () => setActive('Trending') },
					{ label: 'Newest', onClick: () => setActive('Newest') },
				]}
			/>
		</div>
	)
}

function Collections({ withTabs = true, tabs, data }: Props) {
	const [activeTab, setActiveTab] = useState(tabs[0])
	const [activeSort, setActiveSort] = useState('Trending')
	const AllCollection = CollectionsData.sort(() => Math.random() - 0.5)
	const CollectiblesCollection = AllCollection.sort(() => Math.random() - 0.5)
	const RemixCollection = CollectiblesCollection.sort(() => Math.random() - 0.5)
	const NFTsCollection = RemixCollection.sort(() => Math.random() - 0.5)
	const BackgroundsCollection = NFTsCollection.sort(() => Math.random() - 0.5)
	const TemplatesCollection = BackgroundsCollection.sort(() => Math.random() - 0.5)
	const StickersCollection = TemplatesCollection.sort(() => Math.random() - 0.5)
	return (
		<>
			<div className="flex flex-col items-start space-y-6">
				<div className="flex flex-col items-center space-y-6">
					{withTabs ? (
						<>
							<div className="flex flex-row divide-x divide-black items-center w-full space-x-5">
								<SortingDropdown active={activeSort} setActive={setActiveSort} />
								<div className="pl-5">
									<Tabs tabs={tabs} active={activeTab} setActive={setActiveTab} />
								</div>
							</div>
							<div>
								{activeTab === 'All' && <Collection collection={AllCollection} />}
								{activeTab === 'Collectibles' && <Collection collection={CollectiblesCollection} />}
								{activeTab === 'Remix' && <Collection collection={RemixCollection} />}
								{activeTab === 'NFTs' && <Collection collection={NFTsCollection} />}
								{activeTab === 'Backgrounds' && <Collection collection={BackgroundsCollection} />}
								{activeTab === 'Templates' && <Collection collection={TemplatesCollection} />}
								{activeTab === 'Stickers' && <Collection collection={StickersCollection} />}
							</div>
						</>
					) : (
						<Collection collection={data} />
					)}
				</div>
			</div>
		</>
	)
}

export default Collections
