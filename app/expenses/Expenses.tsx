'use client';

import { addCircle, chevronDown, tagOutline } from '@/assets/icons';
import { FormModal, Input } from '@/components';
import { Category, Expense } from '@prisma/client';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFormState, useFormStatus } from 'react-dom';
import { addExpense } from './action';

import { useRouter, useSearchParams } from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

type IExpenses = Readonly<{
  categories: Pick<Category, 'id' | 'title'>[];
  topExpenses: (Expense & { category: Pick<Category, 'title' | 'emoji'> })[];
  todayExpenses: (Expense & { category: Pick<Category, 'title' | 'emoji'> })[];
  categorizedExpenses: (Category & { expenses: Pick<Expense, 'price'>[] })[];
}>;

export default function Expenses({
  categories,
  topExpenses,
  todayExpenses,
  categorizedExpenses,
}: IExpenses) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, formAction] = useFormState(addExpense, null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { pending } = useFormStatus();

  useEffect(() => {
    if (state?.type === 'success') {
      toast.success('Expense Added.');
      setIsOpen(false);
    }
  }, [state?.type]);

  /**
   * the most maximum price from all categorized expenses.
   */
  const maxPrice = useMemo(() => {
    return Math.max(
      ...categorizedExpenses.map(({ expenses }) =>
        expenses.map(({ price }) => price).reduce((a, b) => a + b, 0)
      )
    );
  }, [categorizedExpenses]);

  return (
    <div className='flex w-full flex-col justify-between gap-12 md:flex-row md:gap-80'>
      <div className='w-full md:w-[50%]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-4xl font-semibold'>Expenses</h3>

          {/* Modal to add Expense */}
          <FormModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={
              <button className='flex items-center gap-2 text-primary'>
                Add Expense{' '}
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
              Add Expense
            </strong>
            <p className='text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal'>
              Stay organized with expenses.
            </p>

            <form action={formAction} className='flex flex-col gap-3'>
              <Input
                name='title'
                label='Title'
                error={
                  (state as unknown as { errors: { title: string } })?.errors
                    ?.title
                }
                inputProps={{ placeholder: 'Food', required: true }}
              />
              <Input
                name='description'
                label='Description'
                error={
                  (state as unknown as { errors: { description: string } })
                    ?.errors?.description
                }
                inputProps={{
                  placeholder: 'Pizza and drinks at KFC.',
                  required: true,
                }}
              />
              <Input
                name='price'
                label='Price'
                error={
                  (state as unknown as { errors: { price: string } })?.errors
                    ?.price
                }
                inputProps={{
                  placeholder: 'Rs. 1500',
                  type: 'number',
                  required: true,
                }}
              />

              {categories.length > 0 ? (
                <>
                  <label htmlFor='category'>Category</label>
                  <select name='category' id='category' className='w-full'>
                    {categories.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                  </select>
                </>
              ) : null}

              <button
                type='submit'
                aria-disabled={pending}
                disabled={pending}
                className='mt-6 rounded-md bg-primary px-6 py-2 text-white disabled:bg-gray-400'
              >
                Add Expense
              </button>
            </form>
          </FormModal>
        </div>

        {/* Top Expenses  */}
        <div className='mt-12 flex w-full justify-between'>
          <strong className='text-2xl font-semibold'>Top Expenses</strong>
          <span className='flex items-center gap-2'>
            <DatePicker
              selected={selectedDate}
              className=' w-20 font-semibold  text-primary'
              onChange={(date: Date) => {
                const params = new URLSearchParams(searchParams);
                const paramDate = moment(date).format('DD MM YYYY');
                setSelectedDate(date);
                params.set('date', paramDate.replaceAll(' ', '-'));
                router.push(`?${params}`);
              }}
              dateFormat={'MMM YYYY'}
            />
            <Image
              src={chevronDown}
              alt='date'
              width={24}
              height={24}
              className='h-4 w-4'
            />
          </span>
          {/* <p className='font-semibold  text-primary'>Jan 2024</p> */}
        </div>
        {topExpenses.length > 0 ? (
          <ul className='mt-8 flex flex-col gap-4'>
            {topExpenses.map(
              ({ id, title, price, createdAt, category: { emoji } }) => (
                <li key={id} className='flex w-full items-center gap-2'>
                  <div className='flex w-full items-center gap-2'>
                    <div className='rounded-full bg-gray-300 p-2 text-2xl shadow-sm'>
                      {emoji !== '' ? emoji : '👽'}
                    </div>

                    <span className=''>
                      <strong className='font-semibold '>{title}</strong>
                      <span className='flex items-center gap-4 text-sm font-bold text-black text-opacity-[34%]'>
                        <p>{moment(createdAt).format('LT')}</p>
                        <span className='flex items-center gap-1'>
                          <Image
                            src={tagOutline}
                            alt='expense'
                            width={120}
                            height={120}
                            className='h-4 w-4 rounded-full'
                          />
                          <p>Rent</p>
                        </span>
                      </span>
                    </span>
                  </div>

                  <p className='font-semibold'>{price.toFixed(2)}</p>
                </li>
              )
            )}
          </ul>
        ) : (
          <strong>Get organized by adding expenses.</strong>
        )}

        {/* Expenses of Today */}
        <div className='mt-12 flex w-full justify-between'>
          <strong className='text-2xl font-semibold'>
            Today&apos;s Expenses
          </strong>
        </div>

        {todayExpenses.length > 0 ? (
          <ul className='mt-8 flex flex-col gap-4'>
            {todayExpenses.map(
              ({ id, title, price, createdAt, category: { emoji } }) => (
                <li key={id} className='flex w-full items-center gap-2'>
                  <div className='flex w-full items-center gap-2'>
                    <div className='rounded-full bg-gray-300 p-2 text-2xl shadow-sm'>
                      {emoji !== '' ? emoji : '👽'}
                    </div>

                    <span className=''>
                      <strong className='font-semibold '>{title}</strong>
                      <span className='flex items-center gap-4 text-sm font-bold text-black text-opacity-[34%]'>
                        <p>{moment(createdAt).format('LT')}</p>
                        <span className='flex items-center gap-1'>
                          <Image
                            src={tagOutline}
                            alt='expense'
                            width={120}
                            height={120}
                            className='h-4 w-4 rounded-full'
                          />
                          <p>Rent</p>
                        </span>
                      </span>
                    </span>
                  </div>

                  <p className='font-semibold'>{price.toFixed(2)}</p>
                </li>
              )
            )}
          </ul>
        ) : (
          <strong>No expenses made today.</strong>
        )}
      </div>

      {/* Expenses made by Category */}
      <div className='md:w-[30%]'>
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
