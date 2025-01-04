'use client'
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


const DashboardPage = () => {
  const [startHabitDrawer, setStartHabitDrawer] = useState(false);
  return (
    <div className='flex flex-col gap-2'>
      <Link href={'/dashboard'} className='text-base capitalize text-slate-900 tracking-wide font-medium leading-none'>dashboard</Link>
      {/* ANALYTICS */}

      <div className="">
        <h2>Hi, Karan</h2>
      </div>
      <main className='w-full h-auto lg:h-40 bg-white'>
        <h2 className='text-xl uppercase font-light text-slate-800 my-2'>At a Glance</h2>

        <div className="flex flex-col lg:flex-row h-full gap-2 items-start bg-white">
          <div className="lg:w-1/4 w-full h-24 lg:h-[60%] border rounded-2xl shadow-sm flex">
            <div className="flex h-full w-20 text-green-700">
              {/* <IoIosArrowRoundUp size={'100%'} color='inherit' /> */}
            </div>
            <div className="flex flex-col items-start justify-center w-full h-full">
              <h2 className='text-4xl font-semibold'>14.00%</h2>
              <p className='text-base uppercase'>towards getting better everyday</p>
            </div>
          </div>
        </div>
      </main>
      <button
        className="uppercase hover:text-slate-800 text-sm hover:bg-white text-white hover:border font-semibold px-3 shadow-2xl fixed right-4 bottom-[10%] w-auto bg-orange-600 h-auto py-3 rounded-full flex items-center gap-1 z-[50]"
        onClick={() => setStartHabitDrawer(true)}
      >
        {/* <MdBolt size={24} /> */}
        Create a New Habit
      </button>

      <AnimatePresence>
        {startHabitDrawer && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStartHabitDrawer(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-5/6 lg:w-1/2 bg-white shadow-lg z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Drawer Content */}
              <button
                onClick={() => setStartHabitDrawer(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                X
              </button>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Start a New Habit</h2>
                <form>
                  <input
                    type="text"
                    placeholder="Habit name"
                    className="block w-full p-3 mb-5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200"

                  >
                    Create Habit
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
