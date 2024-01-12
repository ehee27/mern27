import { Link } from 'react-router-dom'

const Login = () => {
  const content = (
    <>
      <div className="p-3 bg-gray-100 h-[80vh]">
        <h1 className="font-sans text-xl md:text-2xl lg:text-4xl p-5">
          Login Page
        </h1>
        {/* --- GRID START ----- */}
        <div className="grid grid-cols-1">
          {/* ----------------- */}
          <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
            <h2 className="text-xl md:text-2xl lg:text-3xl">Heading</h2>
            <p>Welcome to the public login.</p>
            <Link to="/dash">
              <button className="btn btn-accent text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
        {/* ----------------- */}
      </div>
    </>
  )
  return content

  // <div>
  //   <p>Login page...</p>
  //   <Link to="/dash">Dashboard</Link>
  // </div>
}

export default Login
