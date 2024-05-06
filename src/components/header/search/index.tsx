import { SearchIcon } from 'lucide-react';
import React from 'react';
import SearchModal from './SearchModal';
import SearchInput from './SearchInput';
import { cn } from '@/utils';

interface SearchProps {
  withBg?: boolean;
}

function Search({ withBg = true }: SearchProps) {
  const [showSearchModal, setShowSearchModal] = React.useState(false);
  return (
    <>
      <div className="hidden w-full max-w-[30%] lg:block">
        {/* <SearchInput withBg={withBg} /> */}
        <div className="block lg:hidden">
          <button
            className={cn('rounded-full border p-2', {
              'border-white': withBg,
              'border-theme-light-purple': !withBg
            })}
            onClick={() => setShowSearchModal(!showSearchModal)}
          >
            <SearchIcon
              size={24}
              className={cn({
                'text-white': withBg,
                'text-theme-light-purple': !withBg
              })}
            />
          </button>
        </div>
      </div>

      {showSearchModal && (
        <SearchModal show={showSearchModal} setShow={setShowSearchModal} />
      )}
    </>
  );
}

export default Search;
