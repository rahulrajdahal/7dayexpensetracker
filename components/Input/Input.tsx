import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type IInput = Readonly<{
  name: string;
  label?: string;
  error?: string;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}>;
export default function Input({ error, label, name, inputProps }: IInput) {
  return (
    <fieldset className=' flex flex-col gap-2'>
      <span className=' flex items-center gap-5'>
        {label && (
          <label
            className='text-violet11 text-right text-[15px] font-semibold'
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <input
          name={name}
          className='text-violet11 shadow-violet7 focus:shadow-violet8 w-full flex-1 rounded-[4px] px-4  py-2  text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
          {...inputProps}
        />
      </span>
      {error && <p className='block text-sm text-red-600'>{error}</p>}
    </fieldset>
  );
}
