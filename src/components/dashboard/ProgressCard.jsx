import React from 'react'

const ProgressCard = ({icon, count, text}) => {
  return (
   <div className="w-full h-auto border border-slate-300 rounded-xl overflow-visible shadow-sm bg-slate-50 lg:h-full flex flex-col justify-center items-center gap-1 lg:py-3 py-2">
    <div className="flex items-center justify-center h-full">
     {icon} 
     <h1 className='text-5xl font-medium text-center'>{count}</h1>
    </div>
    <p className='text-base font-medium text-center capitalize'>{text}</p>
   </div>
  )
}

export default ProgressCard