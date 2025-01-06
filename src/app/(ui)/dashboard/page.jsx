import Link from 'next/link';
import CreateHabitBtn from '../components/CreateHabitBtn';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

const DashboardPage = async () => {

  const cookieStore = await cookies();
  const session = await auth();
  const testTotalHabits = async () => {
    const req = await fetch(`${process.env.NEXTAUTH_URL}/api/habits`, {
      method: 'GET',
      cache: 'reload',
      credentials: 'same-origin',
      headers: { ContentType: 'application/json', cookie: cookieStore },
    });

    const {data} = await req.json();
    return data;
  };
  // const data = await testTotalHabits();
  return (
    <div className='flex flex-col gap-2'>
      <Link
        href={'/dashboard'}
        className='text-base capitalize text-slate-900 tracking-wide font-medium leading-none'
      >
        dashboard
      </Link>
      {/* ANALYTICS */}

      <div className=''>
        <h2>Hi, Karan</h2>
      </div>
      <main className='w-full h-auto lg:h-40 bg-white'>
        <h2 className='text-xl uppercase font-light text-slate-800 my-2'>
          At a Glance
        </h2>

        <div className='flex flex-col lg:flex-row h-full gap-2 items-start bg-white'>
          <div className='lg:w-1/4 w-full h-24 lg:h-[60%] border rounded-2xl shadow-sm flex'>
            <div className='flex h-full w-20 text-green-700'>
              {/* <IoIosArrowRoundUp size={'100%'} color='inherit' /> */}
            </div>
            <div className='flex flex-col items-start justify-center w-full h-full'>
              <h2 className='text-4xl font-semibold'>{100}</h2>
              <p className='text-base uppercase'>
                towards getting better everyday
              </p>
            </div>
          </div>
        </div>
      </main>

      <CreateHabitBtn session={session} />
    </div>
  );
};

export default DashboardPage;
