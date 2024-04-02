import React, { useEffect, useState } from 'react';
import Dropdown from '@/ui/Dropdown';
import { ChevronDownIcon } from 'lucide-react';

interface ProfileNFTDropdownProps {
  onOptionChange: (option: string) => void;
}

export const ProfileNFTDropdown: React.FC<ProfileNFTDropdownProps> = ({ onOptionChange }) => {
  const nftOptions = [
    { label: 'Ethereum', value: '1' },
    { label: 'Solana', value: '2' },
    { label: 'Polygon', value: '137' },
    { label: 'Zora', value: '7777777' },
  ];

  const [active, setActive] = useState(nftOptions[0].label);
  const [selectedOption, setSelectedOption] = useState<string>(nftOptions[0].value);
  const [selectedNumber,   setSelectedNumber] = useState<string>("");


  const handleOptionClick = (option: { label: string; value: string }) => {
    setActive(option.label);
    setSelectedOption(option.value);
    onOptionChange(option.value);
    console.log('Selected Option:', option.value);
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
        position="left"
        options={nftOptions.map((option) => ({
          label: option.label,
          onClick: () => handleOptionClick(option),
        }))}
      />
    </div>
  );
};