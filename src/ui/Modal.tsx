'use client';

import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, FC } from 'react';
import { XIcon } from 'lucide-react';

interface ModalProps {
  setShow: (show: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  show: boolean;
}

const Modal: FC<ModalProps> = ({ children, setShow, title, show }) => {
  const closeModal = () => {
    setShow(false);
  };

  return (
    <Transition as={Fragment} show={show} appear>
      <Dialog className="relative z-50" onClose={closeModal} as="div">
        <Transition.Child
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          enterTo="opacity-100"
          enterFrom="opacity-0"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              leaveFrom="opacity-100 scale-100"
              enterTo="opacity-100 scale-100"
              enterFrom="opacity-0 scale-95"
              enter="ease-out duration-300"
              leaveTo="opacity-0 scale-95"
              leave="ease-in duration-200"
              as={Fragment}
            >
              <Dialog.Panel className="flex w-full max-w-md transform flex-col space-y-3 overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {title && (
                  <div className="mb-3 flex flex-row items-center justify-between border-b border-gray-300 px-6 py-4">
                    <Dialog.Title
                      className="text-lg font-medium leading-6 text-gray-900"
                      as="h3"
                    >
                      {title}
                    </Dialog.Title>
                    <button onClick={closeModal}>
                      <XIcon className="text-black" size={24} />
                    </button>
                  </div>
                )}
                <div className="px-6 pb-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
