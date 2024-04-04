import React, { useState, useEffect } from 'react';
import Dropdown from '@/ui/Dropdown';
import { ChevronDownIcon } from 'lucide-react';
import axios from 'axios';

interface StickerDropdownProps {
  onOptionChange: (option: string) => void;
}

export const StickerDropdown: React.FC<StickerDropdownProps> = ({ onOptionChange }) => {
  const [stickerOptions, setStickerOptions] = useState<{ label: string; value: string }[]>([]);
  const [active, setActive] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}/asset/authors`);
        const authors = response.data.authors;
        const options = authors.map((author: string) => ({ label: author, value: author }));
        setStickerOptions(options);
        setActive(options[0]?.label || '');
        setSelectedOption(options[0]?.value || '');
        onOptionChange(options[0]?.value || '');
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  const handleOptionClick = (option: { label: string; value: string }) => {
    if(option.value !== selectedOption) {
    setActive(option.label);
    setSelectedOption(option.value);
    onOptionChange(option.value);
    console.log('Selected Option:', option.value);
    }
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