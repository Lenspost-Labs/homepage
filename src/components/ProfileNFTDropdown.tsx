'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState, FC } from 'react';
import { Dropdown } from '@/ui';

interface ProfileNFTDropdownProps {
  onOptionChange: (option: string) => void;
}

const ProfileNFTDropdown: FC<ProfileNFTDropdownProps> = ({
  onOptionChange
}) => {
  const nftOptions = [
    // eslint-disable-next-line perfectionist/sort-objects
    { label: 'Zora', value: '7777777' },
    { label: 'Polygon', value: '137' },
    { label: 'Ethereum', value: '1' },
    { label: 'Solana', value: '2' }
  ];

  const [active, setActive] = useState(nftOptions[0].label);
  const [selectedOption, setSelectedOption] = useState<string>(
    nftOptions[0].value
  );
  const [selectedNumber, setSelectedNumber] = useState<string>('');

  const handleOptionClick = (option: { label: string; value: string }) => {
    setActive(option.label);
    setSelectedOption(option.value);
    onOptionChange(option.value);
  };

  return (
    <div className="flex flex-row items-center lg:ml-auto">
      <Dropdown
        trigger={
          <>
            <button onClick={() => setActive(active)}>{active}</button>
            <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
          </>
        }
        options={nftOptions.map((option) => ({
          onClick: () => handleOptionClick(option),
          label: option.label
        }))}
        position="left"
      />
    </div>
  );
};

export default ProfileNFTDropdown;
