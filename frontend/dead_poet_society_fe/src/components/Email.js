import React from 'react';

export default function Email() {
  return (
    <div className='flex flex-col bg-yellow-600 h-40 justify-center items-center'>
          <h3 className='text-2xl font-bold tracking-wider mb-5'>Get Notified For New Ones</h3>
          <input type="text" placeholder='E-mail' className=' rounded-xl w-1/2 text-center h-8' />
    </div>
  );
}
