'use client';

import * as Dialog from '@radix-ui/react-alert-dialog';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type IFormModal = Readonly<{
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>;
export default function FormModal({
  isOpen = false,
  setIsOpen,
  trigger,
  children,
}: IFormModal) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0' />
        <Dialog.Content className='data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
          {children}

          <Dialog.Cancel className='mt-2 rounded-md bg-gray-400 px-6 py-2'>
            Cancel
          </Dialog.Cancel>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
