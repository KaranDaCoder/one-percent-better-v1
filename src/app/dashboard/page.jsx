// 'use client'
import { BookmarkCheck, ChartNoAxesCombined,  Flame, Heart, Hourglass, Laugh, Smile, Zap } from 'lucide-react'
import Link from 'next/link'
// import { Switch } from '@/app/components/ui/switch'
import { Switch } from '../../components/ui/switch'
import ProgressCard from '../../components/dashboard/ProgressCard'

const DashboardPage = () => {
  return (
    <main className='flex flex-col gap-1'>
      <div className="h-8 w-full mt-1">
        <Link href={'/dashboard'} className='capitalize text-sm w-fit tracking-wider text-blue-700'>dashboard</Link>
      </div>

      <div className="min-h-20 w-full">
        <h1 className='lg:text-4xl text-2xl font-light tracking-wider text-slate-700'>Howdie, <span className='text-orange-700 font-light'>Karan.</span></h1>
        <p className='lg:text-lg text-sm font-medium'>Today is January 07, 2025 & we hope you are having an <span className='font-medium text-green-700'>amazing day!</span></p>
      </div>

      <div className="h-auto w-full flex items-center justify-start">
        <h2 className='uppercase tracking-wider text-lg text-start font-semibold w-full'>progress at a glance</h2>
      </div>

      <div className="min-h-28 w-full grid grid-cols-1 lg:grid-cols-4 gap-2 place-items-center">
        <ProgressCard icon={<Zap size={40} color="orange" strokeWidth={1.00} fill='orange' />} count={22} text={'active habits'} />
        <ProgressCard icon={<BookmarkCheck size={40} color="white" strokeWidth={1.00} fill='orange' />} count={11} text={'completed habit trackers'} />
        {/* <ProgressCard icon={<Laugh size={40} color="gray" strokeWidth={1.00} fill='yellow' />} count={6} text={'towards becoming better.'} /> */}
        <ProgressCard icon={<Flame size={40} color="red" strokeWidth={1.00} fill='orange' />} count={6} text={'habit streak'} />
        <ProgressCard icon={<Hourglass size={40} color="gray" strokeWidth={1.00} fill='none' />} count={16} text={'active habit trackers.'} />
      </div>

   
      <div className="h-auto rounded-sm px-2 text-slate-600 w-full flex items-center justify-center mt-2">
        <h2 className='uppercase h-full tracking-wider text-lg text-start font-semibold w-full'>active & upcoming trackers</h2>
      </div>


      <div className="min-h-80 w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-auto w-full border rounded-md bg-slate-100">
          <h1 className='lg:text-lg text-base text-center font-semibold capitalize '>active habit trackers (15)</h1>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border h-auto py-2 rounded-md flex items-center justify-between bg-white px-2">

              <p className='capitalize lg:w-1/3 w-auto text-sm'>going to the gym everyday</p>

              <p className='hidden lg:block w-1/4 text-start capitalize'>formidable</p>

              <Switch />
            </div>
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p className='capitalize lg:w-1/3 w-auto'>eat banana daily everyday</p>

              <p className='hidden lg:block w-1/4 text-start capitalize'>effortless</p>

              <Switch />
            </div>
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>habit name</p>
              <p>toggle</p>
            </div>
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>habit name</p>
              <p>toggle</p>
            </div>
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>habit name</p>
              <p>toggle</p>
            </div>
          </div>
        </div>
        <div className="h-auto w-full border">
          <h1 className='lg:text-lg text-base text-center font-semibold capitalize'>upcoming habit trackers (15)</h1>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border h-auto py-2 rounded-md flex items-center justify-between bg-white px-2">
              <p className='uppercase'>going to the gym</p>
              {/* <Switch /> */}
              <p>date</p>
            </div>

          </div>
        </div>
      </div>

      <div className="h-auto w-full flex items-center justify-start text-lg font-semibold">
        <h2 className='uppercase tracking-wider text-lg text-center font-semibold w-full'>habits</h2>
 
      </div>
      <div className="min-h-80 w-full mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-auto w-full border rounded-md bg-slate-100">
          <h1 className='lg:text-lg text-base text-center font-semibold capitalize'>habits by category</h1>
          <div className="flex flex-col h-auto py-1 px-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>health & fitness</p>
              <p>12</p>
            </div>

          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>Personal Growth & Learning</p>
              <p>12</p>
            </div>

          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>Productivity & Work</p>
              <p>12</p>
            </div>

          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>Mental and Emotional Well-being</p>
              <p>12</p>
            </div>

          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>Relationships and Social Connections</p>
              <p>12</p>
            </div>

          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>Finances and Money Management</p>
              <p>12</p>
            </div>

          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>Sustainability and Environment</p>
              <p>12</p>
            </div>

          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p>Other</p>
              <p>12</p>
            </div>

          </div>
        </div>
        <div className="h-56 w-full border bg-slate-100 rounded-md">
          <h1 className='lg:text-lg text-base text-center font-semibold capitalize'>habits by difficulty</h1>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p className='uppercase tracking-wider'>Effortless</p>
              <p>12</p>
            </div>
          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p className='uppercase tracking-wider'>Manageable</p>
              <p>12</p>
            </div>
          </div>
          <div className="flex flex-col h-auto py-2 px-2 gap-2">
            <div className="w-full border min-h-10 rounded-md flex items-center justify-between bg-white px-2">
              <p className='uppercase tracking-wider'>Formidable</p>
              <p>12</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRAPH */}
      <div className="h-auto w-full flex items-center justify-start text-lg font-semibold mt-4">
        <h2 className='uppercase tracking-wider text-lg text-start font-semibold w-full'>journey towards getting better</h2>
      
      </div>
      <div className="min-h-56 w-full border"></div>

      <div className="fixed h-12 w-12 lg:w-auto text-slate-50  bg-orange-600 flex items-center justify-center top-1/2 left-1 rounded-full hover:bg-transparent hover:text-orange-700 hover:border">
        <Link href={'/my-habits/create-habit'} className='w-fit flex items-center justify-center gap-1 px-3'>
          <span className=''><Zap /></span>
          <span className='hidden lg:block uppercase'>new habit</span>
        </Link>
      </div>
    </main>

  )
}

export default DashboardPage