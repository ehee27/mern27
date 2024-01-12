import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <>
      <div className="p-3 bg-gray-100 h-[80vh]">
        <h1 className="font-sans text-xl md:text-2xl lg:text-4xl p-5">
          Welcome to the Public Homepage
        </h1>
        {/* --- GRID START ----- */}
        <div className="grid grid-cols-1">
          {/* ----------------- */}
          <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
            <h2 className="text-xl md:text-2xl lg:text-3xl">Heading</h2>
            <p>
              Welcome to the public homepage. We can place any content under the
              sun here. This is the PUBLIC homepage.
            </p>
            <Link to="/login">
              <button className="btn btn-accent text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1">
                Login
              </button>
            </Link>
          </div>
        </div>
        {/* ----------------- */}
      </div>
      <div className="p-3 bg-gray-300">
        {/* <Link to="/login">
          <button className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1">
            Login
          </button>
        </Link> */}
      </div>
    </>
  )
  return content
}

export default Public
