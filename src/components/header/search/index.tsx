import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import SearchModal from './SearchModal'
import SearchInput from './SearchInput'

interface SearchProps {
	withBg?: boolean
}

function Search({ withBg = true }: SearchProps) {
	const [showSearchModal, setShowSearchModal] = React.useState(false)
	return (
		<>
			<div className="lg:block hidden w-full max-w-[525px]">
				<SearchInput withBg={withBg} />
				<div className="lg:hidden block">
					<button
						className={cn('p-2 rounded-full border', { 'border-white': withBg, 'border-theme-light-purple': !withBg })}
						onClick={() => setShowSearchModal(!showSearchModal)}
					>
						<SearchIcon size={24} className={cn({ 'text-white': withBg, 'text-theme-light-purple': !withBg })} />
					</button>
				</div>
			</div>

			{showSearchModal && <SearchModal show={showSearchModal} setShow={setShowSearchModal} />}
		</>
	)
}

export default Search
