import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const CreateHabitForm = ({ setStartHabitDrawer, startHabitDrawer }) => {
 const willPowerAndDeterminationLabels = ["It's a nightmare!", "I think it's doable.", "None at all!"];
 const resources_available_labels = ["Invest money and/or other", "I think it's doable.", "i have everything i need"];
 const tried_before_labels = ["Never, it's my first time.", "Yes, but failed to follow.", "Yes, i follow it right now"];
 const frequency_everyday_labels = ["more than 5 times daily", "2 to 5 times daily", "once in a day"];
 const quit_or_create_labels = ["quitting a habit", "I am not sure yet.", "creating a new habit."];

 const [q1Value, setq1Value] = useState(5);
 const [q2Value, setq2Value] = useState(5);
 const [q3Value, setq3Value] = useState(5);
 const [q4Value, setq4Value] = useState(5);
 const [q5Value, setq5Value] = useState(5);
 const [habit_name, set_habit_name] = useState('');
 const [category, set_category] = useState('Other');
 const [habit_start_date, set_habit_start_date] = useState(new Date().toISOString().slice(0,10));
 const [habitDifficulty, setHabitDifficulty] = useState('Manageable');

 useEffect(() => {
  const total = Number(q1Value) + Number(q2Value) + Number(q3Value) + Number(q4Value) + Number(q5Value);
  const average = total / 5;

  if (average >= 8) {
   setHabitDifficulty('Effortless');
  } else if (average >= 4) {
   setHabitDifficulty('Manageable');
  } else {
   setHabitDifficulty('Formidable');
  }
 }, [q1Value, q2Value, q3Value, q4Value, q5Value]); 
 console.log(habit_start_date)
 return (
  <AnimatePresence>
   {startHabitDrawer && (
    <>
     {/* Backdrop */}
     <motion.div
      className='fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setStartHabitDrawer(!startHabitDrawer)}
     />

     {/* Drawer */}
     <motion.div
      className='fixed top-0 right-0 h-full w-full lg:w-1/2 bg-white shadow-lg z-50 overflow-y-auto'
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
     >
      {/* Drawer Content */}
      <button
       onClick={() => setStartHabitDrawer(false)}
       className='absolute top-4 right-4 text-gray-600 hover:text-gray-900'
      >
       X
      </button>
      <div className='p-4'>
       <h2 className='text-2xl font-bold mb-4 text-center'>Start a New Habit</h2>
       <form className='flex flex-col gap-4'>

        <div className="flex flex-col gap-1">
        <label htmlFor="habit_name" className='text-slate-700 font-semibold'>What do you want to call your habit?</label>
        <input
         type='text'
         placeholder='Habit name'
         required
         className='block w-full py-1 px-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
        />
        </div>
        <div className="flex flex-col gap-1">
        <label htmlFor="habit_name" className='text-slate-700 font-semibold'>How would you describe the habit?</label>
        <textarea name="" id="" rows={5}
          className='block w-full px-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
        />
        </div>
        {/* Questionaire */}

        <section className="w-full border p-1 rounded-md bg-slate-100 flex flex-col gap-2 justify-start items-center">
         <div className="flex justify-between items-center w-full px-1">
         <h2 className='text-lg font-semibold text-center capitalize'>Let's calculate habit's difficulty</h2>
         <p>faqs?</p>
         </div>

         {/* Start-Date */}
         <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
          <label htmlFor="question1" className='tracking-wide capitalize text-base w-full lg:w-3/4'> When do you plan to start?</label>
          <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2 lg:mt-0">
           <input
            type="date"
            id="habit_start_date"
            name="habit_start_date"        
            value={habit_start_date}
            onChange={(e) => set_habit_start_date(e.target.value)}         
            className="cursor-pointer w-fit outline-none font-semibold"
           />
          </div>
         </div>

         {/* Category */}
         <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
          <label htmlFor="question1" className='tracking-wide capitalize text-base w-full lg:w-3/4'>categorize your habit</label>
          <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2 lg:mt-0">
           <select name="habit_category" id="" className='font-semibold w-fit lg:w-auto lg:text-end text-center rounded-md cursor-pointer focus:outline-none bg-white text-base'>
            <option value="">Health and Fitness</option>
            <option value="">Personal Growth and Learning</option>
            <option value="">Mental and Emotional Well-being</option>
            <option value="">Productivity and Work</option>
            <option value="">Relationships and Social Connections</option>
            <option value="">Finances and Money Management</option>
            <option value="">Sustainability and Environment</option>
            <option value="">Other</option>
           </select>
          </div>
         </div>
         {/* Q1 */}
         <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
          <label htmlFor="question1" className='tracking-wide capitalize text-base w-full lg:w-3/4'> <span className='font-semibold '>1.</span>Will power and determination required to follow this habit.</label>
          <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
           <input
            type="range"
            id="question1"
            name="question1"
            min="1"
            max="10"
            step="1"
            value={q1Value}
            onChange={(e) => { setq1Value(e.target.value) }}
            style={{
             background: `linear-gradient(to right, green ${(q1Value - 1) * 11.11}%, gray ${(q1Value - 1) * 11.11}%)`,
            }}
            className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-1 appearance-none"
           />
           <p className="text-sm font-semibold w-auto capitalize mt-1">
            {willPowerAndDeterminationLabels[Math.floor((q1Value) / 4)]}
           </p>
          </div>
         </div>
         {/* Q2 */}
         <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
          <label htmlFor="question1" className='tracking-wide capitalize text-base w-full lg:w-3/4'> <span className='font-semibold '>2.</span>Have you tried following this habit before?</label>
          <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
           <input
            type="range"
            id="question1"
            name="question1"
            min="1"
            max="10"
            step="1"
            value={q2Value}
            onChange={(e) => setq2Value(e.target.value)}
            style={{
             background: `linear-gradient(to right, green ${(q2Value - 1) * 11.11}%, gray ${(q2Value - 1) * 11.11}%)`,
            }}
            className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-1 appearance-none"
           />
           <p className="text-sm font-semibold w-auto capitalize mt-1">
            {tried_before_labels[Math.floor((q2Value) / 4)]}
           </p>
          </div>
         </div>
         {/* Q3 */}
         <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
          <label htmlFor="question1" className='tracking-wide capitalize text-base w-full lg:w-3/4'> <span className='font-semibold '>3.</span>Frequency of the habit daily?</label>
          <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
           <input
            type="range"
            id="question1"
            name="question1"
            min="1"
            max="10"
            step="1"
            value={q3Value}
            onChange={(e) => setq3Value(e.target.value)}
            style={{
             background: `linear-gradient(to right, green ${(q3Value - 1) * 11.11}%, gray ${(q3Value - 1) * 11.11}%)`,
            }}
            className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-1 appearance-none"
           />
           <p className="text-sm font-semibold w-auto capitalize mt-1">
            {frequency_everyday_labels[Math.floor((q3Value) / 4)]}
           </p>
          </div>
         </div>
         {/* Q4 */}
         <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
          <label htmlFor="question1" className='tracking-wide capitalize text-base w-full lg:w-3/4'> <span className='font-semibold '>4.</span>Are you creating or quitting?</label>
          <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
           <input
            type="range"
            id="question1"
            name="question1"
            min="1"
            max="10"
            step="1"
            value={q4Value}
            onChange={(e) => { setq4Value(e.target.value) }}
            style={{
             background: `linear-gradient(to right, green ${(q4Value - 1) * 11.11}%, gray ${(q4Value - 1) * 11.11}%)`,
            }}
            className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-1 appearance-none"
           />
           <p className="text-sm font-semibold w-auto capitalize mt-1">
            {quit_or_create_labels[Math.floor((q4Value) / 4)]}
           </p>
          </div>
         </div>
         {/* Q5 */}
         <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
          <label htmlFor="question1" className='tracking-wide capitalize text-base w-full lg:w-3/4'> <span className='font-semibold '>5.</span>Do you have enough resources?</label>
          <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
           <input
            type="range"
            id="question1"
            name="question1"
            min="1"
            max="10"
            step="1"
            value={q5Value}
            onChange={(e) => setq5Value(e.target.value)}
            style={{
             background: `linear-gradient(to right, green ${(q5Value - 1) * 11.11}%, gray ${(q5Value - 1) * 11.11}%)`,
            }}
            className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-1 appearance-none"
           />
           <p className="text-sm font-semibold w-auto capitalize mt-1">
            {resources_available_labels[Math.floor((q5Value) / 4)]}
           </p>
          </div>
         </div>
         
         <div className='border p-2 rounded-md shadow-sm w-full h-full flex flex-row items-center justify-between bg-white'>
          <label htmlFor="question1" className='tracking-wide capitalize text-lg font-semibold w-full lg:w-3/4'>habit's difficulty</label>
          <p className={`h-full text-center px-10 bg-slate-200 font-semibold tracking-wide uppercase rounded-md py-2 w-auto ${habitDifficulty === 'Effortless' ? 'text-green-900' : 'text-orange-600'}`}>{habitDifficulty}</p>
         </div>
        </section>
        <div className="flex gap-2">
        <button
         type='submit'
         className='w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200'
        >
         maybe, later
        </button>
        <button
         type='submit'
         className='w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200'
        >
         I am ready!
        </button>


        </div>
       </form>
      </div>
     </motion.div>
    </>
   )}
  </AnimatePresence>
 )
}

export default CreateHabitForm