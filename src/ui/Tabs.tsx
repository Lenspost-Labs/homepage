'use client'

import { cn } from '@/lib/utils'

interface Props {
	tabs: string[]
	active: string
	setActive: (active: string) => void
	className?: string
	isTabStyle?: boolean
}

function Tabs({ tabs, active, setActive, className, isTabStyle = true }: Props) {
	const Tab = ({ tab, selected }: { tab: string; selected: boolean }) => {
		return (
			<>
				<div
					className={cn(
						'cursor-pointer text-base px-4 py-1.5 rounded-full font-medium',
						{
							'bg-[rgba(44,52,107,0.08)]': selected && isTabStyle,
							'text-[rgba(44,52,107,1)]': selected && isTabStyle,
							 'text-[rgba(44,52,107,0.64)]': !selected && isTabStyle,
							underline: selected && !isTabStyle,
							'font-semibold': selected,
						},
						className
					)}
					onClick={() => setActive(tab)}
				>
					{tab}
				</div>
			</>
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
