'use client'
import Tabs from '@/ui/Tabs'
import React, { useState } from 'react'
import Collections from '@/components/collections'
import { tabs } from '@/lib/Constants'
import { CampaignsData, CollectionsData } from '@/lib/data'
import Accordions from '@/ui/Accordions'

function ProfileCollections() {
	const [activeTab, setActiveTab] = useState('Gallery')
	return (
		<>
			<div className="flex flex-col space-y-3 md:space-y-6 py-5">
				<div className="flex flex-row space-x-4 mb-2 items-center">
					<Tabs tabs={['Gallery', 'Rewards']} active={activeTab} setActive={setActiveTab} className="!text-lg !md:text-2xl" />
				</div>
				<div>
					{activeTab === 'Gallery' && <Collections withTabs={true} tabs={tabs} data={CollectionsData} isTabStyle={false} />}
					{activeTab === 'Rewards' && <Collections withTabs={false} tabs={tabs} data={CollectionsData} isTabStyle={false} />}
				</div>
			</div>
		</>
	)
}

export default ProfileCollections
