'use client';

import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dialog';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type IFormModal = Readonly<{
  /**
   * Trigger node to open the modal
   */
  trigger: ReactNode;
  /**
   * Content for the modal
   */
  children: ReactNode;
  /**
   * is the modal open?
   */
  isOpen: boolean;
  /**
   * React state to handle modal state
   */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>;
export default function FormModal({
  isOpen,
  setIsOpen,
  trigger,
  children,
}: IFormModal) {
  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Overlay className='bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0' />
        <Content className='data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
          {children}

          <Close className='mt-2 rounded-md bg-gray-400 px-6 py-2'>
            Cancel
          </Close>
        </Content>
      </Portal>
    </Root>
  );
}
