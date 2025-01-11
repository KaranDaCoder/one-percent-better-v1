'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useState } from 'react';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { useForm } from 'react-hook-form';
import { DatePicker } from './DatePicker';
import { Check, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const willPowerAndDeterminationLabels = ["It is nightmarish!", "I can manage.", "Not a lot!"];
const resourcesAvailableLabels = ['Invest emotions or money', 'I can manage', 'I am loaded']
const triedBeforeLabels = ['Yes, I follow it right now', 'Yes, but I failed the last time', 'Never, it is my first time']
const frequencyEverydayLabels = ['More than 5 times everyday', 'Between 2 and 5 times everyday', 'Just once in everyday']
const quitOrCreateLabels = ['Quitting a habit.', 'I am not sure', 'Creating a habit.']

const CreateHabitForm = () => {
  const [tab, setTab] = useState('habitInfo');

  const handleNextTab = () => {
    if (!Object.keys(errors).length) {
      setTab('habitStrength');
    }
    if (tab === 'habitInfo') {
      setTab('habitStrength');
    } else {
      setTab('habitInfo');
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      habit_name: '',
      habit_description: '',
      habit_start_date: '',
      discipline_willpower: 5,
      resources_available: 5,
      tried_before: 5,
      frequency_everyday: 5,
      quit_or_create: 5,
      category: ''
      // user_id: session?.user?._id
    },
  });
  const habitStartDate = watch('habit_start_date');
  const [discipline_willpower, resources_available, tried_before, quit_or_create, frequency_everyday] = watch(['discipline_willpower', 'resources_available', 'tried_before', 'quit_or_create', 'frequency_everyday'])
  const [habitDifficulty, setHabitDifficulty] = useState('Manageable');

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

  
  
  const onSubmit = (data) => {
    console.log(discipline_willpower);
    const average = Number((discipline_willpower + resources_available + tried_before + quit_or_create + frequency_everyday)/5);
    console.log(average);

    console.log(`form submitted`);
    console.log(JSON.stringify(data));
    setTab('habitStrength');
  };

  return (
    <main className='w-full min-h-96 rounded-b-2xl shadow-sm border overflow-hidden'>
      {/* Control active tab using `tab` state */}
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value)}
        className='w-full rounded-none'
      >
        <TabsList className='grid w-full grid-cols-2 rounded-none'>
          <TabsTrigger className='uppercase' value='habitInfo'>
            Habit Details
          </TabsTrigger>
          <TabsTrigger className={`uppercase`} value='habitStrength'  >
            Habit Strength
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Habit Info */}
        <TabsContent value='habitInfo' className='bg-slate-50'>
          <form
            className='w-5/6 h-full flex flex-col mx-auto gap-4 py-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col gap-1'>
              <Label className='text-sm uppercase font-medium tracking-wider text-slate-600'>
                Name you habit
              </Label>
              <Input
                className='bg-white'
                {...register('habit_name', {
                  required: 'habit name is required',
                  minLength: {
                    value: 3,
                    message: 'habit name must be at least 3 characters long',
                  },
                  maxLength: {
                    value: 25,
                    message: 'habit name must be at most 25 characters',
                  },
                })}
              />
              {errors.habit_name && (
                <p className='text-red-400 font-medium text-sm'>
                  {errors.habit_name.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='text-sm uppercase font-medium tracking-wider text-slate-600'>
                describe your habit
              </Label>
              <Textarea rows={5} className='bg-white' />
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='text-sm uppercase font-medium tracking-wider text-slate-600 '>
                Category
              </Label>
              <select
                className='w-full py-1 border outline-none cursor-pointer rounded-md text-sm'
                {...register('category', {
                  required: 'please select a category for your habit.',
                })}
              >
                <option value='' defaultChecked>
                  select a category
                </option>
                <option value='Health and Fitness'>Health and Fitness</option>
                <option value='Personal Growth and Learning'>
                  Personal Growth and Learning
                </option>
                <option value='Productivity and Work'>
                  Productivity and Work
                </option>
                <option value='Mental and Emotional Well-being'>
                  Mental and Emotional Well-being
                </option>
                <option value='Relationships and Social Connections'>
                  Relationships and Social Connections
                </option>
                <option value='Finances and Money Management'>
                  Finances and Money Management
                </option>
                <option value='Sustainability and Environment'>
                  Sustainability and Environment
                </option>
                <option value='Other'>Other</option>
              </select>
              {errors.category && (
                <p className='text-red-400 font-medium text-sm'>
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <Label className='text-sm uppercase font-medium tracking-wider text-slate-600'>
                Start Date
              </Label>
              <DatePicker
                selectedDate={habitStartDate}
                onSelect={(date) => setValue('habit_start_date', date)}
                {...register('habit_start_date', {
                  required: 'habit start date is required',
                })}
              />
              {errors.habit_start_date && (
                <p className='text-red-400 font-medium text-sm'>
                  {errors.habit_start_date.message}
                </p>
              )}
            </div>
            <div className='mt-4 w-full flex justify-end items-center'>
              <Button
                variant='primary'
                type='submit'
                className='uppercase bg-white font-semibold text-green-800 border'
              >
                next step
                <CircleChevronRight />
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Tab 2: Habit Strength */}
        <TabsContent value='habitStrength' className={`bg-slate-50 `} >
          <div className='w-full h-full p-2'>
            <form
              action=''
              className='flex flex-col space-y-4 py-2'
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* q1 */}
              <div className='h-auto border p-2 rounded-lg bg-white'>
                <div className='h-full flex justify-between items-center mb-1'>
                  <p className='text-base font-medium capitalize'>
                    will power and determination
                  </p>
                  <Slider
                    className='w-1/3 lg:w-1/4 cursor-pointer hover:scale-105 transition-all duration-200'
                    defaultValue={[5]}
                    max={10}
                    min={1}
                    step={1}
                    {...register('discipline_willpower', {valueAsNumber : true})}
                  />
                </div>
                <Badge variant='primary' className={'flex items-center border-none justify-end text-end w-full text-sm'}> {willPowerAndDeterminationLabels[Math.floor((discipline_willpower) / 4)]}</Badge>
              </div>
              {/* q2 */}
              <div className='h-auto border p-2 rounded-lg bg-white'>
                <div className='h-full flex justify-between items-center mb-1'>
                  <p className='text-base font-medium capitalize'>
                    resources available
                  </p>
                  <Slider
                    className='w-1/3 lg:w-1/4 cursor-pointer hover:scale-105 transition-all duration-200'
                    defaultValue={[5]}
                    max={10}
                    min={1}
                    step={1}
                    {...register('resources_available', { valueAsNumber: true })}
                  />
                </div>
                <Badge variant='primary' className={'flex items-center border-none justify-end text-end w-full text-sm'}> {resourcesAvailableLabels[Math.floor((resources_available) / 4)]}</Badge>
              </div>
              {/* q3 */}
              <div className='h-auto border p-2 rounded-lg bg-white'>
                <div className='h-full flex justify-between items-center mb-1'>
                  <p className='text-base font-medium capitalize'>
                    tried before
                  </p>
                  <Slider
                    className='w-1/3 lg:w-1/4 cursor-pointer hover:scale-105 transition-all duration-200'
                    defaultValue={[5]}
                    max={10}
                    min={1}
                    step={1}
                    {...register('tried_before', { valueAsNumber: true })}
                  />
                </div>
                <Badge variant='primary' className={'flex items-center border-none justify-end text-end w-full text-sm'}> {triedBeforeLabels[Math.floor((tried_before) / 4)]}</Badge>
              </div>
              {/* q4 */}
              <div className='h-auto border p-2 rounded-lg bg-white'>
                <div className='h-full flex justify-between items-center mb-1'>
                  <p className='text-base font-medium capitalize'>
                    frequency everyday
                  </p>
                  <Slider
                    className='w-1/3 lg:w-1/4 cursor-pointer hover:scale-105 transition-all duration-200'
                    defaultValue={[5]}
                    max={10}
                    min={1}
                    step={1}
                    {...register('frequency_everyday', { valueAsNumber: true })}
                  />
                </div>
                <Badge variant='primary' className={'flex items-center border-none justify-end text-end w-full text-sm'}> {frequencyEverydayLabels[Math.floor((frequency_everyday) / 4)]}</Badge>
              </div>
              {/* q5 */}
              <div className='h-auto border p-2 rounded-lg bg-white'>
                <div className='h-full flex justify-between items-center mb-1'>
                  <p className='text-base font-medium capitalize'>
                    quitting or creating a habit
                  </p>
                  <Slider
                    className='w-1/3 lg:w-1/4 cursor-pointer hover:scale-105 transition-all duration-200'
                    defaultValue={[5]}
                    max={10}
                    min={1}
                    step={1}
                    {...register('quit_or_create', { valueAsNumber: true })}
                  />
                </div>
                <Badge variant='primary' className={'flex items-center border-none justify-end text-end w-full text-sm'}> {quitOrCreateLabels[Math.floor((quit_or_create) / 4)]}</Badge>
              </div>
          
              {/* initial habit strength */}
              <div className='h-auto border p-2 rounded-lg bg-white'>
                <div className='h-full flex justify-between items-center mb-1'>
                  <p className='text-base font-medium uppercase'>
                    initial habit strength
                  </p>
                  <p className='px-2 font-semibold tracking-wide border-none uppercase bg-orange-200 text-slate-700 text-base rounded-lg py-1'>
                    {habitDifficulty}
                  </p>
                </div>
              </div>
              <div className='mt-4 w-full flex justify-between items-center'>
                <Button
                  variant='primary'
                  className='uppercase bg-white font-semibold text-green-800 border'
                  onClick={() => setTab('habitInfo')}
                >
                  <CircleChevronLeft/>
                  back
                </Button>
                <Button
                  variant='primary'
                  className='uppercase bg-orange-600 font-semibold text-white hover:bg-orange-500 border-none'
                  // disabled={Object.keys(errors).length <= 0}
                >
                  <Check size={50}/>
                  create habit
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
      
    </main>
  );
};

export default CreateHabitForm;
