import CreateHabitForm from '@/components/CreateHabitForm';
import React from 'react';



const CreateHabitPage = () => {

  return (
    <main className='flex flex-col gap-4'>
      <h1 className='uppercase text-xl font-semibold tracking-wider text-slate-600'>
        new habit
      </h1>
      <div className='lg:w-full w-full h-auto bg-white flex flex-col lg:flex-row gap-4 py-2'>
        <CreateHabitForm/>
        <div className='w-full  min-h-48 border bg-white'>
          <h1>Before I start a habit</h1>
        </div>
      </div>
    </main>
  );
};

export default CreateHabitPage;
