import { SearchIcon } from 'lucide-react';
import { useState, FC } from 'react';
import { cn } from '@/utils';

import SearchModal from './SearchModal';

interface SearchProps {
  withBg?: boolean;
}

const Search: FC<SearchProps> = ({ withBg = true }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <>
      <div className="hidden w-full max-w-[30%] lg:block">
        {/* <SearchInput withBg={withBg} /> */}
        <div className="block lg:hidden">
          <button
            className={cn('rounded-full border p-2', {
              'border-theme-light-purple': !withBg,
              'border-white': withBg
            })}
            onClick={() => setShowSearchModal(!showSearchModal)}
          >
            <SearchIcon
              className={cn({
                'text-theme-light-purple': !withBg,
                'text-white': withBg
              })}
              size={24}
            />
          </button>
        </div>
      </div>

      {showSearchModal && (
        <SearchModal setShow={setShowSearchModal} show={showSearchModal} />
      )}
    </>
  );
};

export default Search;
