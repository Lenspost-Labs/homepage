import Image from 'next/image'
import Counter from './Counter'
import TextCounter from './TextCounter'

const CounterBox = ({ title, percentage, week, count }: { title: string; percentage: string; week: string; count: string }) => {
	return (
		<>
			<div className="flex w-full lg:w-1/2 relative overflow-hidden flex-row items-start justify-between border-2 border-[#E1F36D] rounded-2xl p-2 sm:p-4 lg:p-8">
				<TextCounter title={title} count={count} />
				{/* <Counter percentage={percentage} week={week} /> */}
				<div className="absolute -bottom-12 -right-5 -rotate-[15deg]">
					<Image loading="lazy" src="/gift.png" alt="profile-graph" width="155" height="136" />
				</div>
			</div>
		</>
	)
}

export default CounterBox
