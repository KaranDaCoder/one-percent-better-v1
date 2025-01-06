'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ChevronRight, CloseIcon } from '../utils/HeroIcons';


const CreateHabitForm1 = ({ setStartHabitDrawer, startHabitDrawer, session }) => {
  const router = useRouter();

  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      habit_name: '',
      habit_description: '',
      habit_start_date: new Date().toISOString().slice(0, 10),
      discipline_willpower: 5,
      resources_available: 5,
      tried_before: 5,
      frequency_everyday: 5,
      quit_or_create: 5,
      category: 'Other',
      user_id: session?.user?._id
    }
  })

  const willPowerAndDeterminationLabels = ["It's a nightmare!", "I think it is doable.", "None at all!"];
  const resources_available_labels = ["Invest in resources", "I think it's doable.", "I have everything i need"];
  const tried_before_labels = ["Never, it's my first time.", "Yes, but failed to follow.", "Yes, I follow it right now"];
  const frequency_everyday_labels = ["More than 5 times daily", "2 to 5 times daily", "Once in a day"];
  const quit_or_create_labels = ["Quitting a habit", "I am not sure yet.", "Creating a new habit."];
  const [habitDifficulty, setHabitDifficulty] = useState('Manageable');

  const [discipline_willpower, resources_available, tried_before, quit_or_create, frequency_everyday] = watch(['discipline_willpower', 'resources_available', 'tried_before', 'quit_or_create', 'frequency_everyday'])
  useEffect(() => {
 
    const values = [discipline_willpower, resources_available, tried_before, quit_or_create, frequency_everyday].map(Number);

    // Calculate average
    const total = values.reduce((acc, val) => acc + val, 0);
    const average = total / values.length;
      if (average >= 8) {
        setHabitDifficulty('Effortless');
      } else if (average >= 4) {
        setHabitDifficulty('Manageable');
      } else {
        setHabitDifficulty('Formidable');
      }
  }, [[discipline_willpower, resources_available, tried_before, quit_or_create, frequency_everyday]]);


  const onSubmit = async (data) => {
    /*  try {
       console.log("Form Submitted: ", data);
       const request = await fetch(`/api/habits`, {method : 'POST', cache: 'no-cache', redirect: 'follow', body: JSON.stringify(data) });
       const resp = await request.json();
       if(request.ok) {
         router.refresh();
         reset();
         return resp;
       } else {
         throw new Error(resp.error)
       }
     } catch (error) {
       console.log(error)
     } */
    console.log("Form Submitted: ", data);
    // setStartHabitDrawer(false); // Close the drawer after submission
  };



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
              <CloseIcon size={'size-8'} color={'black'} />
            </button>
            <div className='p-4'>
              <h2 className='text-2xl font-semibold uppercase mb-4 text-start'>create New Habit</h2>

              <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col gap-1">
                  <label htmlFor="habit_name" className='text-slate-700 font-semibold'>What do you want to call your habit?</label>
                  <input
                    {...register("habit_name",
                      {
                        required: "Habit name is required",
                        minLength: { value: 3, message: "Habit name must be at least 3 characters long" },
                        maxLength: { value: 45, message: "Habit name must be at most 45 characters long" }
                      })}
                    type='text'
                    placeholder='Habit name'
                    className='block w-full py-1 px-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white'
                  />
                  {errors.habit_name && <span className='text-red-500 font-medium text-sm'>{errors.habit_name.message}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="habit_name" className='text-slate-700 font-semibold'>How would you describe the habit?</label>
                  <textarea name="" id="" rows={5}
                    {...register("habit_description", { required: false })}
                    className='block w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                  />
                </div>

                <section className='flex flex-col gap-2'>
                  {/* Start-Date */}
                  <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0'>
                    <label htmlFor="question1" className='text-slate-700 text-base font-semibold w-full lg:w-3/4'> When do you plan to start?</label>
                    <div className="flex flex-col gap-1 flex-1 items-center justify-around w-full  h-full mt-1 border rounded-md  py-2 px-4 border-slate-300">
                      <input
                        type="date"
                        id="habit_start_date"
                        name="habit_start_date"
                        {...register("habit_start_date", {
                          // valueAsDate: true,

                        })}
                        className="cursor-pointer w-fit outline-none font-semibold bg-white"
                      />

                    </div>

                    {errors.habit_start_date && <span className="text-red-500 font-semibold">
                      {errors.habit_start_date.message}
                    </span>}

                  </div>

                  {/* Category */}
                  <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0'>
                    <label htmlFor="question1" className='text-slate-700 font-semibold w-full lg:w-3/4'>Categorize your habit</label>
                    <div className="flex flex-col flex-1 items-center justify-center h-full mt-1">
                      <select name="habit_category" id="" className='border py-1 border-slate-300 font-semibold w-full rounded-md lg:w-auto text-center cursor-pointer focus:outline-none bg-white text-base' {...register('category', {})}>
                        <option value="Other">Other</option>
                        <option value="Health and Fitness">Health and Fitness</option>
                        <option value="Personal Growth and Learning">Personal Growth and Learning</option>
                        <option value="Mental and Emotional Well-being">Mental and Emotional Well-being</option>
                        <option value="Productivity and Work">Productivity and Work</option>
                        <option value="Relationships and Social Connections">Relationships and Social Connections</option>
                        <option value="Finances and Money Management">Finances and Money Management</option>
                        <option value="Sustainability and Environment">Sustainability and Environment</option>
                      </select>
                    </div>
                  </div>
                </section>
                {/* Questionaire */}

                <section className="w-full border p-1 rounded-md bg-slate-100 flex flex-col gap-2 justify-start items-center">
                  <div className="flex justify-between items-center w-full px-1">
                    <h2 className='text-lg font-medium text-slate-600 '>calculate initial habit difficulty</h2>
                    <p>faqs?</p>
                  </div>

                  {/* Q1 */}
                  <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
                    <label htmlFor="question1" className='tracking-wide  text-sm font-semibold w-full lg:w-2/3'>Will power and determination required to follow this habit.</label>
                    <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-3">
                      <input
                        type="range"
                        id="question1"
                        name="question1"
                        min="1"
                        max="10"
                        step="1"
                        {...register('discipline_willpower', { valueAsNumber: true })}
                        style={{
                          background: `linear-gradient(to right, green ${(discipline_willpower - 1) * 11.11}%, gray ${(discipline_willpower - 1) * 11.11}%)`,
                        }}
                        className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-2 appearance-none"
                      />
                      <p className="text-sm font-semibold w-auto  mt-1">
                        {willPowerAndDeterminationLabels[Math.floor((discipline_willpower) / 4)]}
                      </p>
                    </div>
                  </div>
                  {/* Q2 */}
                  <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
                    <label htmlFor="question1" className='tracking-wide  text-sm font-semibold w-full lg:w-2/3'>Have you tried following this habit before?</label>
                    <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
                      <input
                        type="range"
                        id="question1"
                        name="question1"
                        min="1"
                        max="10"
                        step="1"
                        {...register('tried_before', { valueAsNumber: true })}
                        style={{
                          background: `linear-gradient(to right, green ${(tried_before - 1) * 11.11}%, gray ${(tried_before - 1) * 11.11}%)`,
                        }}
                        className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-2 appearance-none"
                      />
                      <p className="text-sm font-semibold w-auto  mt-1">
                        {tried_before_labels[Math.floor((tried_before) / 4)]}
                      </p>
                    </div>
                  </div>


                  <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
                    <label htmlFor="question1" className='tracking-wide  text-sm font-semibold w-full lg:w-2/3'>Frequency of the habit daily?</label>
                    <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
                      <input
                        type="range"
                        id="question1"
                        name="question1"
                        min="1"
                        max="10"
                        step="1"
                        {...register('frequency_everyday', { valueAsNumber: true })}
                        style={{
                          background: `linear-gradient(to right, green ${(frequency_everyday - 1) * 11.11}%, gray ${(frequency_everyday - 1) * 11.11}%)`,
                        }}
                        className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-2 appearance-none"
                      />
                      <p className="text-sm font-semibold w-auto  mt-1">
                        {frequency_everyday_labels[Math.floor((frequency_everyday) / 4)]}
                      </p>
                    </div>
                  </div>

                  <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
                    <label htmlFor="question1" className='tracking-wide  text-sm font-semibold w-full lg:w-2/3'>Are you creating or quitting?</label>
                    <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
                      <input
                        type="range"
                        id="question1"
                        name="question1"
                        min="1"
                        max="10"
                        step="1"
                        {...register('quit_or_create', { valueAsNumber: true })}
                        style={{
                          background: `linear-gradient(to right, green ${(quit_or_create - 1) * 11.11}%, gray ${(quit_or_create - 1) * 11.11}%)`,
                        }}
                        className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-2 appearance-none"
                      />
                      <p className="text-sm font-semibold w-auto  mt-1">
                        {quit_or_create_labels[Math.floor((quit_or_create) / 4)]}
                      </p>
                    </div>
                  </div>

                  <div className='border p-2 bg-white rounded-md shadow-sm w-full flex flex-col lg:flex-row lg:items-center'>
                    <label htmlFor="question1" className='tracking-wide  text-sm font-semibold w-full lg:w-2/3'>Do you have enough resources?</label>
                    <div className="flex flex-col gap-1 flex-1 items-center justify-center h-full mt-2">
                      <input
                        type="range"
                        id="question1"
                        name="question1"
                        min="1"
                        max="10"
                        step="1"
                        {...register('resources_available', { valueAsNumber: true })}
                        style={{
                          background: `linear-gradient(to right, green ${(resources_available - 1) * 11.11}%, gray ${(resources_available - 1) * 11.11}%)`,
                        }}
                        className="cursor-pointer w-full transition-all duration-1000 ease-in-out rounded-full h-2 appearance-none"
                      />
                      <p className="text-sm font-semibold w-auto  mt-1">
                        {resources_available_labels[Math.floor((resources_available) / 4)]}
                      </p>
                    </div>
                  </div>


                  <div className='border px-2 py-1 my-2 rounded-md shadow-2xl w-full h-full flex flex-row items-center justify-between bg-slate-700 text-white'>
                    <label htmlFor="question1" className='text-lg font-medium  w-full lg:w-3/4'>
                    intial habit difficulty
                    </label>
                    <p className={`h-full w-56 font-semibold tracking-widest uppercase text-center`}>{habitDifficulty}</p>
                  </div>
                </section>
                <div className="flex gap-2 mt-1 justify-around items-center">
                  <button
                    // type='submit'
                    onClick={() => setStartHabitDrawer(false)}
                    className='w-full py-3 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition duration-200 uppercase'
                  >
                    maybe later
                  </button>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={` uppercase w-full py-3 bg-orange-600 text-white rounded-md transition duration-200 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Lets go!'}
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

export default CreateHabitForm1