import PageHeader from '@/components/PageHeader'
import Collections from '@/components/collections'
import { tabs } from '@/lib/Constants'
import { CollectionsData } from '@/lib/data'

export default function Home() {
	return (
		<>
			<PageHeader backgroundImage="/cover1.png" title="Claynosaurz" isCollection isFeatured />
			<div className="flex flex-col px-5 py-5 md:py-10 md:px-20">
				<div className="py-1.5">
					<Collections withTabs={true} tabs={tabs} data={CollectionsData} />
				</div>
			</div>
		</>
	)
}
