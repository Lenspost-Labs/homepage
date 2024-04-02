import React, { useState, useEffect } from 'react';
import Dropdown from '@/ui/Dropdown';
import { ChevronDownIcon } from 'lucide-react';

interface NFTDropdownProps {
    onAddressChange: (address: string) => void;
  }

  export const NFTDropdown: React.FC<NFTDropdownProps> = ({ onAddressChange }) => {
  const [nftOptions, setNFTOptions] = useState([]);
  const [active, setActive] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  useEffect(() => {
    const fetchNFTData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/collection?page=1`);
        const data = await response.json();
        const options = data.assets.map((asset: any) => ({
            label: asset.name,
            value: asset.id,
            address: asset.address,
        }));
        setNFTOptions(options);
        setActive(options[0]?.label || '');
        setSelectedAddress(options[0]?.address || '');
        onAddressChange(options[0]?.address || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } catch (error) {
        console.error('Error fetching NFT data:', error);
    }
    };

    fetchNFTData();
  }, []);

  // useEffect(() => {
  //   onAddressChange(selectedAddress);
  // }, [selectedAddress, onAddressChange]);
  

  const handleOptionClick = (option: { label: string; address: string }) => {
    if (option.address !== selectedAddress) {
      setActive(option.label);
      setSelectedAddress(option.address);
      onAddressChange(option.address);
      console.log('Selected Address:', option.address);
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
        options={nftOptions.map((option: { label: string; address: string }) => ({
          label: option.label,
          onClick: () => handleOptionClick(option),
        }))}
      />
    </div>
  );
};