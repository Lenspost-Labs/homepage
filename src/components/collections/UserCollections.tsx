'use client'
import Tabs from '@/ui/Tabs'
import React, { useState } from 'react'
import Collections from '@/components/collections'
import { tabs } from '@/lib/Constants'
import { CampaignsData, CollectionsData } from '@/lib/data'
import Accordions from '@/ui/Accordions'

function UserCollections() {
	const [activeTab, setActiveTab] = useState('Assets')
	return (
		<>
			<div className="flex flex-col space-y-4 md:space-y-6 py-8 md:py-10 px-5 md:px-20">
				<div className="flex flex-row space-x-4 mb-2 items-center">
					<Tabs tabs={['Assets', 'Campaigns']} active={activeTab} setActive={setActiveTab} className="!text-lg !md:text-2xl" />
				</div>
				<div>
					{activeTab === 'Assets' && <Collections withTabs={true} tabs={tabs} data={CollectionsData} isTabStyle={false} />}
					{activeTab === 'Campaigns' && (
						<div className="md:py-6 py-3 flex-col space-y-3 md:space-y-6 max-w-7xl">
							<div className="border-t border-theme-light-purple-50 pb-10 flex w-full h-1"></div>
							<div>
								<Accordions accordions={CampaignsData} />
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default UserCollections
