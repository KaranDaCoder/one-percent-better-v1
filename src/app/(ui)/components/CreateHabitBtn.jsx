'use client';
import React, { useState } from 'react';
import { MdBolt } from 'react-icons/md';
import CreateHabitForm1 from './CreateHabitForm1';


const CreateHabitBtn = ({ session }) => {
  const [startHabitDrawer, setStartHabitDrawer] = useState(false);
  return (
    <>
      <button
        className='uppercase hover:text-slate-800 text-sm hover:bg-white text-white hover:border font-semibold px-3 shadow-lg fixed left-4 bottom-[10%] w-auto bg-orange-600 h-auto py-3 rounded-full flex items-center gap-1 z-[50] hover:scale-105 transition-all duration-200'
        onClick={() => setStartHabitDrawer(!startHabitDrawer)}
      >
        <MdBolt size={24} />
        <span className='hidden lg:block'>create new habit</span>
      </button>
      {startHabitDrawer && (
        <CreateHabitForm1
          startHabitDrawer={startHabitDrawer}
          setStartHabitDrawer={setStartHabitDrawer}
          session={session}
        />
      )}
    </>
  );
};

export default CreateHabitBtn;
