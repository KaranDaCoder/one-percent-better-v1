
import CreateHabitForm from '@/components/CreateHabitForm'
import { Button } from '@/components/ui/button'
import { Bolt, CircleChevronLeft, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const CreateHabitPage = () => {
  return (
  
    <main className='w-full gap-4 flex flex-col items-center'>
      <div className="lg:w-1/2 w-full">
      <div className="w-full flex justify-between items-center">
          <Link href={'/dashboard'} className='flex flex-col items-center justify-center'>
            <CircleChevronLeft size={40} strokeWidth={0.50} />
            {/* <span>back</span> */}
            {/* <Button variant='primary' >maybe later</Button> */}
          </Link>
        <h1 className='inline-flex justify-center w-full items-center gap-2 uppercase font-semibold tracking-wide text-center text-3xl mb-2'>
          <Zap size={60} strokeWidth={1.00} fill='none' color='orange' />
          create new habit</h1>

      </div>
        <CreateHabitForm/>
      </div>
      <div className="lg:w-3/4 w-full">
        <h1 className='uppercase text-center text-2xl mb-2'>frequently asked</h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>
    </main>
  )
}

export default CreateHabitPage