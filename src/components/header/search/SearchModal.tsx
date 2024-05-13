import Modal from '@/ui/Modal';
import { FC } from 'react';

import SearchInput from './SearchInput';

interface SearchModalProps {
  setShow: (show: boolean) => void;
  show: boolean;
}

const SearchModal: FC<SearchModalProps> = ({ setShow, show }) => {
  return (
    <Modal setShow={setShow} title="Search" show={show}>
      <div className="w-full">
        <SearchInput withBg={false} />
      </div>
    </Modal>
  );
};

export default SearchModal;
