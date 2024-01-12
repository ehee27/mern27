import { Link } from 'react-router-dom'

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
  const content = (
    <>
      <div className="p-3 bg-gray-100 h-[80vh]">
        <h1 className="text-xl md:text-2xl lg:text-3xl p-5">
          WELCOME TO YOUR DASHBOARD
        </h1>

        {/* --- GRID START ----- */}
        <div className="grid grid-cols-1">
          {/* ----------------- */}
          <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
            {/* <h2 className="text-xl md:text-2xl lg:text-3xl">HEADING</h2> */}
            <p className="text-sm md:text-xl lg:text-xl">Today is: {today}</p>
          </div>
        </div>
        {/* ----------------- */}
      </div>
    </>
  )
  return content
}

export default Welcome
