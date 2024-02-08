export default function loading() {
  return (
    <div className=' w-full animate-pulse'>
      <div className='flex w-full justify-between gap-16'>
        <div className='w-full'>
          <div className='mb-4 flex items-center justify-between'>
            <div className=' h-12 w-80 rounded-md bg-gray-300' />
            <div className=' h-4 w-32 rounded-md bg-gray-300' />
          </div>

          <div className='w-full'>
            <div className='flex w-full items-center justify-between'>
              <div className='h-8 w-80 rounded-md bg-gray-300' />
              <div className='h-4 w-12 rounded-md bg-gray-300' />
            </div>

            <ul className='mt-8 flex w-full flex-col gap-6'>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <li
                    key={i.toPrecision()}
                    className='flex w-full flex-col items-center gap-2'
                  >
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex w-full items-center'>
                        <div className='h-12 w-12 rounded-full bg-gray-300' />

                        <div className='w-80'>
                          <div className='h-4 w-full  rounded-full bg-gray-300' />
                          <div className='mt-4 flex items-center gap-2'>
                            <div className='h-4 w-20  rounded-full bg-gray-300' />
                            <div className='h-4 w-12  rounded-full bg-gray-300' />
                          </div>
                        </div>
                      </div>
                      <div className='h-2 w-12 rounded-full bg-gray-300' />
                    </div>
                  </li>
                ))}
            </ul>

            <div className='mt-16 h-8 w-80 rounded-md bg-gray-300' />

            <ul className='mt-8 flex w-full flex-col gap-6'>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <li
                    key={i.toPrecision()}
                    className='flex w-full flex-col items-center gap-2'
                  >
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex w-full items-center'>
                        <div className='h-12 w-12 rounded-full bg-gray-300' />

                        <div className='w-80'>
                          <div className='h-4 w-full  rounded-full bg-gray-300' />
                          <div className='mt-4 flex items-center gap-2'>
                            <div className='h-4 w-20  rounded-full bg-gray-300' />
                            <div className='h-4 w-12  rounded-full bg-gray-300' />
                          </div>
                        </div>
                      </div>
                      <div className='h-2 w-12 rounded-full bg-gray-300' />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className='w-1/2'>
          <div className='mb-6 h-10 w-40 rounded-full bg-gray-300' />

          <ul className='flex w-full flex-col gap-4'>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <li
                  key={i.toPrecision()}
                  className='flex w-full flex-col items-center gap-2'
                >
                  <div className='flex w-full items-center justify-between'>
                    <div className='h-4 w-40 rounded-full bg-gray-300' />
                    <div className='h-2 w-12 rounded-full bg-gray-300' />
                  </div>
                  <div className='h-2 w-full rounded-full bg-gray-300' />
                </li>
              ))}
          </ul>
        </div>
      </div>
      <span className='sr-only'></span>
    </div>
  );
}
