// each page will have a title and formatted content div(s)
// everything below title place within grid  ***created some separation so it's clear

const Home = () => {
  return (
    <div className="p-3">
      <h1 className="text-xl md:text-2xl lg:text-3xl p-5">PAGE TITLE</h1>
      {/* --- GRID START ----- */}
      <div className="grid grid-cols-1">
        {/* ----------------- */}
        <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl">HEADING</h2>
          <p>
            The app is meant to provide a basic styling framework using Tailwind
            CSS. Each page has a simple structure with options for single
            column, 2 column and 3 column layouts. The goal was to provide as
            little CSS as possible to get you up and running. Layouts are spaced
            evenly for aesthetics and also break for mobile. This will allow
            your apps to start off in a place where you can easily visualize the
            big picture, so you can focus on features and functionality.
          </p>
        </div>
      </div>
      {/* ----------------- */}
    </div>
  )
}

export default Home
