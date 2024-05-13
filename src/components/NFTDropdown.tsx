'use client';

import { useEffect, useState, FC } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { BACKEND_ENDPOINT } from '@/data';
import { Dropdown } from '@/ui';

interface NFTDropdownProps {
  onAddressChange: (address: string) => void;
}

const NFTDropdown: FC<NFTDropdownProps> = ({ onAddressChange }) => {
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [nftOptions, setNFTOptions] = useState([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const response = await fetch(`${BACKEND_ENDPOINT}/collection?page=1`);
        const data = await response.json();
        const options = data.assets.map((asset: any) => ({
          address: asset.address,
          label: asset.name,
          value: asset.id
        }));
        setSelectedAddress(options[0]?.address || '');
        onAddressChange(options[0]?.address || '');
        setActive(options[0]?.label || '');
        setNFTOptions(options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      } catch (error: any) {}
    };

    fetchNFTData();
  }, [onAddressChange]);

  // useEffect(() => {
  //   onAddressChange(selectedAddress);
  // }, [selectedAddress, onAddressChange]);

  const handleOptionClick = (option: { address: string; label: string }) => {
    if (option.address !== selectedAddress) {
      setSelectedAddress(option.address);
      onAddressChange(option.address);
      setActive(option.label);
    }
  };
  return (
    <div className="flex flex-row items-center lg:ml-auto">
      <Dropdown
        options={nftOptions.map(
          (option: { address: string; label: string }) => ({
            onClick: () => handleOptionClick(option),
            label: option.label
          })
        )}
        trigger={
          <>
            <button onClick={() => setActive(active)}>{active}</button>
            <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
          </>
        }
        position="left"
      />
    </div>
  );
};

export default NFTDropdown;
