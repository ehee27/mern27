import { Link } from 'react-router-dom'
import baum from '../../../public/assets/Baum-Walker-Stadium-1.png'
import Loading from '../Loading'

const Public = () => {
  //
  const content = (
    <>
      <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-[url('../../../public/assets/Baum-Walker-Stadium-1.png')]">
        <div className="hero-overlay bg-black bg-opacity-70">
          <div className="flex flex-col min-h-[100%] pt-20 text-white">
            <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900">
              <h1 className="font-sans text-sm md:text-2xl lg:text-5xl font-black p-5 text-center">
                Welcome to the SHO
              </h1>
              <div className="flex flex-col gap-4 text-left text-sm md:text-xl my-4">
                <p>
                  Getting recruited to play college baseball is no easy task.
                  High school student-athletes must put in a lot of hard work to
                  keep up their grades and continue to improve their game, but
                  that's just the beginning. Many student-athletes believe, “If
                  I’m good enough, coaches will find me, and I’ll get
                  recruited.”{' '}
                </p>
                <p>
                  The reality is that student-athletes need to be just as
                  engaged with their college baseball recruiting process as they
                  are dedicated to mastering their skills on the field.
                </p>{' '}
                <p>
                  Our focus is to help young prospects get more exposure and
                  connect with college coaches and scouts.
                </p>
              </div>
              <Link to="/login">
                <button className="btn btn-accent text-white rounded.lg w-[40%] rounded-md p-1">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  return content
}

export default Public
