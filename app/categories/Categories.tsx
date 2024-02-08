'use client';

import { addCircle } from '@/assets/icons';
import { FormModal, Input } from '@/components';
import { Category, Expense } from '@prisma/client';
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import { addCategory } from './action';

type ICategories = Readonly<{
  categories: Category[];
  topExpenses: (Expense & { category: Pick<Category, 'title' | 'emoji'> })[];

  categorizedExpenses: (Category & { expenses: Pick<Expense, 'price'>[] })[];
}>;

export default function Categories({
  categories,
  topExpenses,
  categorizedExpenses,
}: ICategories) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddCategory = async (prevData: any, formData: FormData) => {
    await addCategory(prevData, formData);
    toast.success('Category Added');
    setIsOpen(false);
  };
  const [state, formAction] = useFormState(handleAddCategory, null);
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const { pending } = useFormStatus();

  const maxPrice = useMemo(() => {
    return Math.max(
      ...categorizedExpenses.map(({ expenses }) =>
        expenses.map(({ price }) => price).reduce((a, b) => a + b, 0)
      )
    );
  }, [categorizedExpenses]);
  return (
    <div className='flex w-full justify-between gap-80'>
      <div className='w-[50%]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-4xl font-semibold'>Category</h3>
          <FormModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={
              <button className='flex items-center gap-2 text-primary'>
                Add Category{' '}
                <Image
                  src={addCircle}
                  alt='add'
                  width={24}
                  height={24}
                  className='h-4 w-4'
                />
              </button>
            }
          >
            <strong className='text-mauve12 m-0 text-[17px] font-medium'>
              Add Category
            </strong>
            <p className='text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal'>
              Categorize your expenses.
            </p>

            <form action={formAction} className='flex flex-col gap-4'>
              <Input
                name='title'
                label='Category Title'
                error={
                  (state as unknown as { errors: { title: string } })?.errors
                    ?.title
                }
                inputProps={{ placeholder: 'Rent', required: true }}
              />

              {!isEmojiOpen && (
                <Input
                  name='emoji'
                  label='Emoji'
                  error={
                    (state as unknown as { errors: { emoji: string } })?.errors
                      ?.emoji
                  }
                  inputProps={{
                    placeholder: '🍕',
                    value: emoji,
                    required: true,
                    onChange: () => setIsEmojiOpen(true),
                  }}
                />
              )}
              <EmojiPicker
                open={isEmojiOpen}
                onEmojiClick={({ emoji }) => {
                  setEmoji(emoji);
                  setIsEmojiOpen(false);
                }}
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
          </FormModal>
        </div>

        {categories.length > 0 ? (
          <>
            <div className='mb-8 mt-12 flex w-full justify-between'>
              <strong className='text-2xl font-semibold'>
                Your Categories
              </strong>
            </div>

            <ul className=' flex flex-col gap-4'>
              {categories.map(
                ({ id, title, createdAt, emoji: categoryEmoji }) => (
                  <li key={id} className='flex w-full items-center gap-2'>
                    <div className='flex w-full items-center gap-2'>
                      <div className='rounded-full bg-gray-300 p-2 text-2xl shadow-sm'>
                        {categoryEmoji}
                      </div>

                      <strong className='capitalize'>{title}</strong>
                    </div>

                    <p className='whitespace-nowrap font-semibold text-[#A8A8A8]'>
                      Created at {moment(createdAt).format('L')}
                    </p>
                  </li>
                )
              )}
            </ul>
          </>
        ) : (
          <strong className=''>
            Add Categories and organize your expenses.
          </strong>
        )}

        <div className='mb-8 mt-12 flex w-full justify-between'>
          <strong className='text-2xl font-semibold'>
            Top Expenses By Category
          </strong>
        </div>

        {topExpenses.length > 0 ? (
          <ul className=' flex flex-col gap-4'>
            {topExpenses.map(
              ({ id, price, category: { title, emoji: categoryEmoji } }) => (
                <li key={id} className='flex w-full items-center gap-2'>
                  <div className='flex w-full items-center gap-2'>
                    <div className='rounded-full bg-gray-300 p-2 text-2xl shadow-sm'>
                      {categoryEmoji}
                    </div>

                    <strong className='capitalize'>{title}</strong>
                  </div>

                  <p className='whitespace-nowrap font-semibold text-black'>
                    {price.toFixed(2)}
                  </p>
                </li>
              )
            )}
          </ul>
        ) : (
          <strong className=''>Add Expenses and organize your expenses.</strong>
        )}
      </div>

      <div className='w-[30%]'>
        <strong className='text-2xl font-semibold '>
          Where your money go?
        </strong>

        <ul className='mt-4 flex flex-col gap-4'>
          {categorizedExpenses.map(({ id, title, expenses }) => (
            <li key={id} className='flex flex-col gap-2'>
              <span className='flex items-center justify-between font-semibold'>
                <p className='capitalize'>{title}</p>
                <p>
                  {expenses
                    .map(({ price }) => price)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                </p>
              </span>
              <progress
                max={maxPrice}
                value={expenses
                  .map(({ price }) => price)
                  .reduce((a, b) => a + b, 0)}
                className='h-2 rounded-md bg-primary'
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
