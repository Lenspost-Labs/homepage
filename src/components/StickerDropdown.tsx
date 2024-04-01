import React, { useState } from 'react';
import Dropdown from '@/ui/Dropdown';
import { ChevronDownIcon } from 'lucide-react';

interface StickerDropdownProps {
  onOptionChange: (option: string) => void;
}

export const StickerDropdown: React.FC<StickerDropdownProps> = ({ onOptionChange }) => {
  const stickerOptions = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ];

  const [active, setActive] = useState(stickerOptions[0].label);
  const [selectedOption, setSelectedOption] = useState<string>(stickerOptions[0].value);

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
        options={stickerOptions.map((option) => ({
          label: option.label,
          onClick: () => handleOptionClick(option),
        }))}
      />
    </div>
  );
};