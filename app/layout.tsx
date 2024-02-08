import { StyledComponentsRegistry } from '@/components';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '7DayExpense Tracker',
  description: 'Track your expenses. Categorize expenses.',
};

type IRootLayout = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <main className='flex flex-col gap-10 bg-primary px-4 py-8 md:h-screen  md:flex-row'>
            <aside className='flex w-full justify-between md:w-auto md:flex-col md:justify-start  md:px-28 md:py-20'>
              <div>
                <a href='/'>
                  <Image
                    width={50}
                    height={80}
                    src='data:image/jpeg;base64,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'
                    alt='bruno'
                    className='h-20 w-16 rounded-md'
                  />
                </a>

                <strong className='mb-[7px] text-xl font-bold text-white'>
                  Bruno
                </strong>
                <p className='text-base font-semibold text-white'>
                  burno@email.com
                </p>
              </div>

              <ul className='mt-12'>
                <li>
                  <a
                    href='/expenses'
                    className={`text-base font-semibold text-white`}
                  >
                    Expenses
                  </a>
                </li>
                <li>
                  <a
                    href='/categories'
                    className='text-base font-semibold text-white'
                  >
                    Category
                  </a>
                </li>
              </ul>
            </aside>

            <div className='w-full rounded-md bg-white px-2 py-4 md:py-20 md:pl-20 md:pr-4'>
              {children}
            </div>
          </main>

          <Toaster />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
