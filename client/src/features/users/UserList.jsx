import { useGetUsersQuery } from './usersApiSlice'
import Loading from '../../components/Loading'
import User from './User'
// import { useState } from 'react'
const UserList = () => {
  //
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(null, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })
  //
  let content
  if (isLoading) content = <Loading />
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }
  if (isSuccess) {
    const { ids } = users

    const pageContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null
    content = (
      <div className="p-3">
        <h1 className="text-xl md:text-2xl lg:text-3xl p-5">Users List</h1>
        {/* --- GRID START ----- */}
        <div className="grid grid-cols-1">
          {/* ----------------- */}
          <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
            <div>{pageContent}</div>
          </div>
        </div>
      </div>
    )
    return content
  }
}

export default UserList
