'use client'

import { cn } from '@/lib/utils'

interface Props {
	tabs: string[]
	active: string
	setActive: (active: string) => void
}

function Tabs({ tabs, active, setActive }: Props) {
	const Tab = ({ tab, selected }: { tab: string; selected: boolean }) => {
		return (
			<div
				className={cn('cursor-pointer text-base px-4 py-1.5 rounded-full font-medium', {
					'bg-theme-light-purple-50': selected,
					'text-theme-purple': selected,
					'font-semibold': selected,
				})}
				onClick={() => setActive(tab)}
			>
				{tab}
			</div>
		)
	}
	return (
		<div className="flex flex-col space-y-6">
			<div className="flex flex-row items-center space-x-2">
				{tabs.map((tab, index) => (
					<Tab tab={tab} key={index} selected={tab === active} />
				))}
			</div>
		</div>
	)
}

export default Tabs
