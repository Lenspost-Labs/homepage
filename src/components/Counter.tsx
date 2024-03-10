import { ArrowUp } from 'lucide-react'

const Counter = ({ percentage, week }: { percentage: string; week: string }) => {
	return (
		<>
			<div className="flex flex-col items-start space-y-4">
				<div className="flex flex-row -mt-5 -mr-5 items-center justify-between border border-theme-light-purple rounded-[30px] px-2 space-x-2 py-1">
					<div>
						<ArrowUp size={18} className="text-theme-purple" />
					</div>
					<div className="flex flex-row items-center space-x-1">
						<p className="text-base text-theme-purple">{percentage}%</p>
						<p className="text-base text-theme-gray">{week} week</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Counter
