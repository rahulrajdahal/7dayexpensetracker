'use client';

import { addCategory } from '@/app/categories/action';
import * as Dialog from '@radix-ui/react-alert-dialog';
import { ReactNode, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import Input from '../Input/Input';

type IFormModal = Readonly<{ trigger: ReactNode }>;
export default function FormModal({ trigger }: IFormModal) {
  const { pending } = useFormStatus();

  const [isOpen, setIsOpen] = useState(false);

  const handleAddCategory = async (prevData: any, formData: FormData) => {
    await addCategory(prevData, formData);
    toast.success('Category Added');
    setIsOpen(false);
  };
  const [state, formAction] = useFormState(handleAddCategory, null);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0' />
        <Dialog.Content className='data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
          <Dialog.Title className='text-mauve12 m-0 text-[17px] font-medium'>
            Add Category
          </Dialog.Title>
          <Dialog.Description className='text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal'>
            Categorize your expenses.
          </Dialog.Description>

          <form action={formAction}>
            <Input
              name='title'
              label='Category Title'
              error={(state as any)?.errors?.title as string}
              inputProps={{ placeholder: 'Rent' }}
            />

            <button
              type='submit'
              aria-disabled={pending}
              disabled={pending}
              className='mt-6 rounded-md bg-primary px-6 py-2 text-white'
            >
              Add Category
            </button>
          </form>

          <Dialog.Cancel className='mt-2 rounded-md bg-gray-400 px-6 py-2'>
            Cancel
          </Dialog.Cancel>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
