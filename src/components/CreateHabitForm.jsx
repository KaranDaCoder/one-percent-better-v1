'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/DatePicker';
import { Slider } from '@/components/ui/slider';
import { Loader, SmilePlus, Turtle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined'; // Walking
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined'; // Running
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'; // Sprinting
import CloseIcon from '@mui/icons-material/Close';
import { Badge } from './ui/badge';
import { habitCategories } from '@/staticDataUi/HabitCategories';
import Link from 'next/link';

const CreateHabitForm = () => {
  const [habitDifficulty, setHabitDifficulty] = useState('');
  const [habitIcon, setHabitIcon] = useState(<DirectionsWalkOutlinedIcon />);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      habit_name: '',
      habit_description: '',
      habit_start_date: new Date(),
      discipline_willpower: 5,
      resources_available: 5,
      tried_before: 5,
      frequency_everyday: 5,
      quit_or_create: 5,
      category: '',
    },
  });

  const willPowerAndDeterminationLabels = [
    "It's a nightmare!",
    'It feels overwhelming.',
    'I think it is doable.',
    'Bring it on!',
  ];
  const resourcesAvailableLabels = [
    'Invest a lot in resources',
    'Some available, but not enough.',
    "I think it's doable.",
    'I have everything I need',
  ];
  const triedBeforeLabels = [
    "Never, it's my first time.",
    'I think but do not remember.',
    'Yes, but failed to follow.',
    'Yes, I follow it right now',
  ];
  const frequencyEverydayLabels = [
    'More than 5 times daily',
    '4 to 5 times daily',
    '2 to 3 times daily',
    'Once in a day',
  ];
  const quitOrCreateLabels = [
    'Quitting a habit',
    'Considering both options.',
    'I am not sure yet.',
    'Creating a new habit.',
  ];

  const [
    discipline_willpower,
    resources_available,
    tried_before,
    quit_or_create,
    frequency_everyday,
  ] = watch([
    'discipline_willpower',
    'resources_available',
    'tried_before',
    'quit_or_create',
    'frequency_everyday',
  ]);

  useEffect(() => {
    const values = [
      discipline_willpower,
      resources_available,
      tried_before,
      quit_or_create,
      frequency_everyday,
    ].map(Number);

    // Calculate average
    const total = values.reduce((acc, val) => acc + val, 0);
    const average = total / values.length;
    console.log(average);

    // Update habit difficulty and icon based on average strength
    if (average >= 9) {
      setHabitDifficulty('Sprinting');
      setHabitIcon(
        <RocketLaunchOutlinedIcon color='inherit' fontSize='large' />
      );
    } else if (average >= 6 && average < 9) {
      setHabitDifficulty('Running');
      setHabitIcon(
        <DirectionsRunOutlinedIcon color='inherit' fontSize='large' />
      );
    } else if (average >= 3 && average < 6) {
      setHabitDifficulty('Walking');
      setHabitIcon(
        <DirectionsWalkOutlinedIcon color='inherit' fontSize='large' />
      );
    } else {
      setHabitDifficulty('Crawling');
      setHabitIcon(
        <AssistWalkerOutlinedIcon color='inherit' fontSize='large' />
      );
    }
  }, [
    discipline_willpower,
    resources_available,
    tried_before,
    quit_or_create,
    frequency_everyday,
  ]);

  const onSubmit = async (data) => {
    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await timeout(2000);
      console.log(`form submitted`);
      console.log(JSON.stringify(data));
    } catch (err) {}
  };
  console.log(errors);

  return (
    <form
      className='flex flex-col gap-3 items-center w-full rounded-2xl shadow-lg border p-4 bg-slate-50'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex gap-2 items-center justify-center'>
        <SmilePlus />
        <h1 className='text-slate-600 font-semibold text-lg'>
          CREATE A NEW HABIT
        </h1>
      </div>

      {/* Habit Name */}
      <div className='flex justify-center flex-col w-full'>
        <label
          htmlFor='habit_name'
          className='text-base text-muted-foreground font-semibold tracking-wide uppercase'
        >
          Habit Name
        </label>
        <Input
          className='w-full bg-white'
          {...register('habit_name', {
            required: 'Habit name is required',
            minLength: {
              value: 3,
              message: 'Habit name must be at least 3 characters long',
            },
            maxLength: {
              value: 45,
              message: 'Habit name must be at most 45 characters long',
            },
          })}
        />
        {errors.habit_name && (
          <span className='text-red-500 font-medium text-sm'>
            {errors.habit_name.message}
          </span>
        )}
      </div>

      {/* Category */}
      <div className='flex justify-center flex-col w-full'>
        <label
          htmlFor='category'
          className='text-base text-muted-foreground font-semibold tracking-wide uppercase'
        >
          Category
        </label>
        <Select
          value={watch('category') || 'Health and Fitness'} // Bind to the form value
          onValueChange={(value) => setValue('category', value)}
        >
          <SelectTrigger className='w-full bg-white'>
            <SelectValue placeholder='Select a category' />
          </SelectTrigger>
          <SelectContent>
            {habitCategories.map((cat) => (
              <SelectItem
                value={cat.cat_name}
                key={cat.cat_key}
                {...register('category', { required: false })}
              >
                <div className='flex items-center space-x-2'>
                  {cat.cat_icon}
                  <span className='text-sm font-semibold text-slate-600'>
                    {cat.cat_name}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Habit Description */}
      <div className='flex justify-center flex-col w-full'>
        <label
          htmlFor='habit_description'
          className='text-base text-muted-foreground font-semibold tracking-wide uppercase'
        >
          Description
        </label>
        <Textarea
          className='w-full bg-white'
          {...register('habit_description')}
        />
      </div>

      {/* Start Date */}
      <div className='w-full'>
        <label
          htmlFor='start_date'
          className='text-base text-muted-foreground font-semibold tracking-wide uppercase'
        >
          Start Date
        </label>
        <DatePicker
          className='w-full'
          value={watch('habit_start_date')}
          onChange={(selectedDate) =>
            setValue('habit_start_date', selectedDate)
          } // Update form state on date change
        />
      </div>

      {/* Habit Strength */}
      <div className='w-full min-h-40 mt-1'>
        <label
          htmlFor='habit_strength'
          className='text-base text-muted-foreground font-semibold tracking-wide uppercase'
        >
          Habit Strength
        </label>
        <div className='flex flex-col gap-4'>
          {[
            {
              label: 'Willpower & Discipline',
              value: discipline_willpower,
              labels: willPowerAndDeterminationLabels,
              name: 'discipline_willpower',
              color: 'bg-blue-200',
            },
            {
              label: 'Resources Available',
              value: resources_available,
              labels: resourcesAvailableLabels,
              name: 'resources_available',
              color: 'bg-orange-200',
            },
            {
              label: 'Tried Before',
              value: tried_before,
              labels: triedBeforeLabels,
              name: 'tried_before',
              color: 'bg-green-300',
            },
            ,
            {
              label: 'Quit or create',
              value: quit_or_create,
              labels: quitOrCreateLabels,
              name: 'quit_or_create',
              color: 'bg-red-200',
            },
            {
              label: 'Frequency Everyday',
              value: frequency_everyday,
              labels: frequencyEverydayLabels,
              name: 'frequency_everyday',
              color: 'bg-pink-200',
            },
          ].map((field, index) => (
            <div
              key={index}
              className='flex w-full justify-between items-center p-2 border rounded-md bg-white shadow-sm'
            >
              <div className='w-full flex flex-col gap-1'>
                <label className='w-full font-semibold text-sm uppercase text-slate-600 tracking-wide'>
                  {field.label}
                </label>
                <Badge
                  variant={'outline'}
                  className={`text-sm text-slate-700 font-semibold w-fit ${field.color} rounded-md`}
                >
                  {field.labels[Math.ceil(field.value / 4)]}
                </Badge>
              </div>
              <Slider
                min={0}
                max={10}
                value={[field.value]}
                step={1}
                onValueChange={(val) => setValue(field.name, val[0])}
                className='w-[40%] cursor-pointer'
                {...register(field.name, { valueAsNumber: true })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Final Strength */}
      <div className='flex w-full justify-between font-medium items-center py-2 border-t-2'>
        <label className='font-semibold text-base uppercase text-slate-800 tracking-wide'>
          Initial Strength
        </label>
        <div className='flex items-center w-auto px-2 lg:w-1/3 justify-center rounded-lg py-1 shadow-sm bg-white border'>
          <span className='text-green-700'>{habitIcon}</span>
          <h1 className='uppercase font-semibold text-lg tracking-wider'>
            {habitDifficulty}
          </h1>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-between w-full'>
        <Link href={'/dashboard'}>
          <Button className='uppercase'>
            {' '}
            <CloseIcon fontSize='large' /> Maybe later
          </Button>
          {/* Maybe Later */}
        </Link>
        <Button
          className={`bg-orange-700 uppercase hover:bg-orange-800`}
          disabled={Object.entries(errors).length > 0 ? true : false}
        >
          {isSubmitting ? (
            <span className='flex items-center gap-1'>
              <Loader className='animate-spin' /> Creating Habit
            </span>
          ) : (
            <span className='flex items-center gap-1'>
              <SmilePlus />
              Create Habit
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateHabitForm;
