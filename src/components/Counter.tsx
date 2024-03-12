import { ArrowUp } from 'lucide-react'

const Counter = ({ percentage, week }: { percentage: string; week: string }) => {
	return (
		<>
			<div className="flex flex-col items-start space-y-4 relative z-10">
				<div className="flex flex-row -mt-2 -mr-2 md:-mt-5 md:-mr-5 items-center justify-between border bg-white/80 backdrop-blur border-theme-light-purple rounded-[30px] px-1 md:px-2 space-x-1 md:space-x-2 py-1">
					<div>
						<ArrowUp className="text-theme-purple w-4 h-4" />
					</div>
					<div className="flex flex-row items-center space-x-1">
						<p className="text-sm md:text-base text-theme-purple">{percentage}%</p>
						<p className="text-sm md:text-base text-theme-gray">{week} week</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Counter
