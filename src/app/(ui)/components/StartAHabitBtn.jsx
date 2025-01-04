'use client';
import React, { useEffect, useState } from 'react';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';

const StartAHabitBtn = () => {
  const [habitForm, setHabitForm] = useState(false);

  return (
    <div className='hidden lg:block w-60 h-2/3'>
      <button className='hover:bg-orange-600 text-slate-700 font-semibold shadow-md bg-white border border-slate-300 hover:text-white px-3 h-full 
      flex items-center justify-center rounded-md uppercase tracking-wider hover:border-none' onClick={() => setHabitForm(!habitForm)}>
        <BoltRoundedIcon fontSize='large' color='inherit'/>
        start a new habit
      </button>
      {habitForm}
    </div>
  );
};

export default StartAHabitBtn;
