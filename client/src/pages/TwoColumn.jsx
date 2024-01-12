// notice grid-cols set to 2 on md and above

const TwoColumn = () => {
  return (
    <div className="p-3">
      <h1 className="text-xl md:text-2xl lg:text-3xl p-5">PAGE TITLE</h1>
      {/* --- GRID START ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ----------------- */}
        <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl">HEADING</h2>
          <p>
            Standard body content goes here directly under the heading. Standard
            body content goes here directly under the heading. Standard body
            content goes here directly under the heading. Standard body content
            goes here directly under the heading.
          </p>
        </div>
        <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl">HEADING</h2>
          <p>
            Standard body content goes here directly under the heading. Standard
            body content goes here directly under the heading. Standard body
            content goes here directly under the heading. Standard body content
            goes here directly under the heading.
          </p>
        </div>
      </div>
      {/* ----------------- */}
    </div>
  )
}

export default TwoColumn
