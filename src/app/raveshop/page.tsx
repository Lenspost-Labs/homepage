import Collections from '@/components/collections'
import { tabs } from '@/lib/Constants'
import { CollectionsData } from '@/lib/data'
import React from 'react'

function Raveshop() {
	return (
		<>
			<div className="flex flex-col pt-28 md:pt-36 pb-5 md:pb-20 items-start space-y-5 md:space-y-10 px-5 md:px-20">
				<RaveshopInfo />
				<Collections withTabs={true} tabs={tabs} data={CollectionsData} isTabStyle={true} />
			</div>
		</>
	)
}

export default Raveshop

const RaveshopInfo = () => {
	return (
		<>
			<div className="flex flex-col space-y-3 md:space-y-5">
				<h2 className="text-3xl md:text-5xl font-bold">Raveshop</h2>
				<p className="text-xl md:text-3xl font-medium">Redeem your $POSTER Tokens</p>
			</div>
		</>
	)
}
