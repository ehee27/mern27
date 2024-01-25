import { useGetUsersQuery } from './usersApiSlice'
import Loading from '../../components/Loading'
import UserCard from './UserCard'
// import { useState } from 'react'
const UserList = () => {
  // RTK Actions ---------------------------------------------
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  // CONTENT
  let content

  // loading
  if (isLoading) content = <Loading />

  // error
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  // success - CONVERT RTK DATA ---------------------
  if (isSuccess) {
    const { ids } = users
    //
    const pageContent =
      ids?.length &&
      ids.map(userId => <UserCard key={userId} userId={userId} />)

    content = (
      <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-gradient-to-br from-gray-700 via-gray-900 to-black">
        <div className="hero-overlay bg-black bg-opacity-70">
          <div className="flex flex-col min-h-[100%] pt-20 text-white">
            <div className="py-10 px-6 mx-10 rounded-lg">
              <h1 className="font-sans text-sm md:text-2xl lg:text-5xl font-black p-5 text-center">
                Players
              </h1>
              <div className="flex flex-col justify-center items-center text-sm my-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {pageContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className="p-3 bg-zinc-800 h-[80vh]">
      //   <h1 className="font-sans text-xl md:text-2xl lg:text-4xl p-5 text-white">
      //     Users List
      //   </h1>
      //   {/* --- GRID START ----- */}
      //   <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      //     {pageContent}
      //   </div>
      // </div>
    )
    return content
  }
}

export default UserList
