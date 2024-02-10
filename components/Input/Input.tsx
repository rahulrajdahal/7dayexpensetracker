import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type IInput = Readonly<{
  /**
   * name form controller for the input
   */
  name: string;
  /**
   * Input label
   */
  label?: string;
  /**
   * Input error text
   */
  error?: string;
  /**
   * Extends input props
   */
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}>;
export default function Input({ error, label, name, inputProps }: IInput) {
  return (
    <fieldset className=' flex flex-col gap-2'>
      <label htmlFor={name} className='flex flex-col items-start gap-2'>
        {label && (
          <p className='text-violet11 text-right text-[15px] font-semibold'>
            {label}
          </p>
        )}
        <input
          name={name}
          className='text-violet11 shadow-violet7 focus:shadow-violet8 w-full flex-1 rounded-[4px] px-4  py-2  text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
          {...inputProps}
        />
      </label>
      {error && <p className='block text-sm text-red-600'>{error}</p>}
    </fieldset>
  );
}
