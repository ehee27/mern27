import { ImSpinner } from 'react-icons/im'

const Loading = () => {
  return (
    <>
      <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-[url('../../../public/assets/Baum-Walker-Stadium-1.png')]">
        <div className="flex justify-center items-center bg-black bg-opacity-90">
          <ImSpinner className="h-20 w-40 mx-auto text-green-500 animate-spin" />
        </div>
      </div>
    </>
  )
}

export default Loading
