'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/utils';

function SearchInput({ withBg = true }: { withBg: boolean }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() !== '') {
      router.push(`/profile/${searchValue}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex flex-row items-center">
        <div className="absolute left-4">
          <SearchIcon
            size={24}
            className={cn({
              'text-[#2C346B66]': !withBg,
              'text-white': withBg
            })}
          />
        </div>
        <input
          type="text"
          placeholder="Search Gallery Feed"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={cn(
            'h-12 w-full rounded-full border-0 pl-12 pr-5 outline-none ring-0',
            {
              'bg-white/30 placeholder-white placeholder-opacity-60': withBg,
              'border-[1px] bg-[rgba(252,255,231,1)] text-[#2C346B66] placeholder-[#2C346B66] placeholder-opacity-20':
                !withBg
            }
          )}
        />
      </div>
    </form>
  );
}

export default SearchInput;
