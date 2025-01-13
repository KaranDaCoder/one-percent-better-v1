import { FlameIcon, SignpostBig, Smile, TrendingUp, Zap } from "lucide-react"
import { Switch } from "@/components/ui/switch"


const DashboardPage = () => {
  return (
    <main className='flex flex-col gap-4
    '>
      <h1 className="uppercase text-xl font-light tracking-wider">dashboard</h1>
      <div className="w-full flex flex-col">
        <h1 className="text-4xl tracking-widest font-semibold">Hello, Karan.</h1>
        <p className="text-base text-muted-foreground">Today is January 13, 2025 and we hope you are doing amazing.</p>
      </div>
      {/* Snapshot of Progress */}
      <div className="h-auto py-1">
        <h1 className="uppercase text-xl mb-1">snapshot of your progress</h1>
        <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-2">

          <div className="w-full h-full border flex flex-col justify-center items-center gap-1 py-2 bg-slate-50 border-slate-700 rounded-lg">
            <div className="flex items-center justify-center gap-2">
            <Smile className="h-16 w-16" fill="white" strokeWidth='0.75'/>
            <h1 className="text-5xl font-extrabold">12</h1>
            </div>
            <p className="text-lg uppercase"> habits</p>
          </div>

          <div className="w-full h-full border flex flex-col justify-center items-center gap-1 py-2 bg-slate-50 border-slate-700 rounded-lg">
            <div className="flex items-center justify-center gap-2">
            <SignpostBig className="h-16 w-16" fill="white" strokeWidth='0.75'/>
            <h1 className="text-5xl font-extrabold">54</h1>
            </div>
            <p className="text-lg uppercase">habit trackers</p>
          </div>
          <div className="w-full h-full border flex flex-col justify-center items-center gap-1 py-2 bg-slate-50 border-slate-700 rounded-lg">
            <div className="flex items-center justify-center gap-2">
            <Zap className="h-16 w-16" fill="white" strokeWidth='0.75'/>
            <h1 className="text-5xl font-extrabold">4</h1>
            </div>
            <p className="text-lg uppercase">completion streak</p>
          </div>
          <div className="w-full h-full border flex flex-col justify-center items-center gap-1 py-2 bg-slate-50 border-slate-700 rounded-lg">
            <div className="flex items-center justify-center gap-2">
            <TrendingUp className="h-16 w-16" fill="white" strokeWidth='0.75'/>
            <h1 className="text-5xl font-extrabold">86.88%</h1>
            </div>
            <p className="text-lg uppercase">towards getting better</p>
          </div>
         
        </div>
      </div>

      {/* Active and Upcoming trackers */}
      <div className="h-auto py-1">
        <h1 className="uppercase text-xl mb-1">Your habit trackers</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="w-full h-auto border bg-slate-50 border-slate-700 rounded-lg py-2">
            <h1 className="text-center font-medium capitalize">Active habit trackers</h1>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex justify-between items-center border px-2 py-2 text-sm bg-slate-100 border-slate-300 rounded-lg">
                <p>habit name</p>
                <p>category</p>
                <Switch/>
              </div>
              <div className="flex justify-between items-center border px-2 py-1 rounded-lg text-sm">
                <p>habit name</p>
                <p>category</p>
                <p>toggle</p>
              </div>
            </div>
          </div>
          <div className="w-full h-auto border bg-slate-50 border-slate-700 rounded-lg py-2">
            <h1 className="text-center font-medium capitalize">Upcoming habit trackers</h1>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex justify-between items-center border px-2 py-2 text-sm bg-slate-100 border-slate-300 rounded-lg">
                <p>habit name</p>
                <p>easy</p>
                <p>Jan 14, 25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Habits by category */}
      <div className="h-auto py-1">
        <h1 className="uppercase text-xl mb-1">Your habits</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="w-full h-auto border bg-slate-50 border-slate-700 rounded-lg py-2">
            <h1 className="text-center font-medium capitalize">Habits by category</h1>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex justify-between items-center border px-2 py-2 text-sm bg-slate-100 border-slate-300 rounded-lg">
                <p>habit name</p>
                <p>category</p>
                <Switch />
              </div>
              <div className="flex justify-between items-center border px-2 py-1 rounded-lg text-sm">
                <p>habit name</p>
                <p>category</p>
                <p>toggle</p>
              </div>
            </div>
          </div>
          <div className="w-full h-auto border bg-slate-50 border-slate-700 rounded-lg py-2">
            <h1 className="text-center font-medium capitalize">Habits by difficulty</h1>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex justify-between items-center border px-2 py-2 text-sm bg-slate-100 border-slate-300 rounded-lg">
                <p>habit name</p>
                <p>easy</p>
                <p>Jan 14, 25</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>



  )
}

export default DashboardPage