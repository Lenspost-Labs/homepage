import Modal from '@/ui/Modal';
import { Dialog, Transition } from '@headlessui/react';
import React, { FC } from 'react';
import SearchInput from './SearchInput';

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SearchModal: FC<Props> = ({ show, setShow }) => {
  return (
    <>
      <Modal show={show} setShow={setShow} title="Search">
        <div className="w-full">
          <SearchInput withBg={false} />
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
