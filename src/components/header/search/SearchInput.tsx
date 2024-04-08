"use client"
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

function SearchInput({ withBg = true }: { withBg: boolean }) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchValue.trim() !== '') {
      router.push(`/profile/${searchValue}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex relative flex-row items-center">
        <div className="absolute left-4">
          <SearchIcon size={24} className={cn({ 'text-theme-purple': !withBg, 'text-white': withBg })} />
        </div>
        <input
          type="text"
          placeholder="Search Gallery Feed"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={cn('pr-5 pl-12 w-full h-12 outline-none border-0 ring-0 rounded-full', {
            'bg-white/30 placeholder-white placeholder-opacity-60': withBg,
            'bg-theme-light-purple/50 text-black placeholder-black placeholder-opacity-20': !withBg,
          })}
        />
      </div>
    </form>
  )
}

export default SearchInput