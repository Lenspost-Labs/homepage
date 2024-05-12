'use client';

import { useEffect, useState, FC } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { BACKEND_ENDPOINT } from '@/data';
import { Dropdown } from '@/ui';
import axios from 'axios';
interface StickerDropdownProps {
  onOptionChange: (option: string) => void;
}

const StickerDropdown: FC<StickerDropdownProps> = ({ onOptionChange }) => {
  const [stickerOptions, setStickerOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [active, setActive] = useState('');

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${BACKEND_ENDPOINT}/asset/authors`);
        const authors = response.data.authors;
        const options = authors.map((author: string) => ({
          label: author,
          value: author
        }));
        setSelectedOption(options[0]?.value || '');
        onOptionChange(options[0]?.value || '');
        setActive(options[0]?.label || '');
        setStickerOptions(options);
      } catch (error) {}
    };

    fetchAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionClick = (option: { label: string; value: string }) => {
    if (option.value !== selectedOption) {
      setSelectedOption(option.value);
      onOptionChange(option.value);
      setActive(option.label);
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
        options={stickerOptions.map((option) => ({
          onClick: () => handleOptionClick(option),
          label: option.label
        }))}
        position="left"
      />
    </div>
  );
};

export default StickerDropdown;
