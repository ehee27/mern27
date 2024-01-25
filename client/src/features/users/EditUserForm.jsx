// removed all 'delete' functionality here - we can come back to that later on
import { useState, useEffect } from 'react'
import { useUpdateUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../components/Loading'
// import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user, setTransition }) => {
  //---- initializers
  const navigate = useNavigate()
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation()

  //---- STATE VARIABLES -------------------------------
  const [username, setUsername] = useState(user.username)
  // const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)
  const [position, setPosition] = useState('')
  const [number, setNumber] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bats, setBats] = useState('')
  const [throws, setThrows] = useState('')
  const [hs, setHS] = useState('')
  const [bio, setBio] = useState('')
  // const [transition, setTransition] = useState(false)

  //---- SET VALUES and MONITOR SUCCESSFUL UPDATE -----
  // useEffect(() => {
  //   setValidUsername(USER_REGEX.test(username))
  // }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setTransition(true)
      setTimeout(() => {
        setTransition(false)
        navigate('/dash/users')
      }, 1000)
      setUsername('')
      setPassword('')
      setRoles([])
    }
  }, [isSuccess, navigate])

  //---- STATE HANDLERS -------------------------------
  const onPositionChanged = e => setPosition(e.target.value)
  const onNumberChanged = e => setNumber(e.target.value)
  const onAgeChanged = e => setAge(e.target.value)
  const onHeightChanged = e => setHeight(e.target.value)
  const onWeightChanged = e => setWeight(e.target.value)
  const onBatsChanged = e => setBats(e.target.value)
  const onThrowsChanged = e => setThrows(e.target.value)
  const onHSChanged = e => setHS(e.target.value)
  const onBioChanged = e => setBio(e.target.value)

  //---- UPDATING ONSAVE -------------------------------
  const onSaveUserClicked = async e => {
    if (password) {
      await updateUser({
        id: user.id,
        username,
        roles,
        active,
        position,
        number,
        age,
        height,
        weight,
        bats,
        throws,
        hs,
        bio,
      })
    } else {
      await updateUser({
        id: user.id,
        username,
        roles,
        active,
        position,
        number,
        age,
        height,
        weight,
        bats,
        throws,
        hs,
        bio,
      })
    }
    navigate(`/dash/users/${user.id}`)
  }

  //---- CAN SAVE -------------------------------
  // let canSave
  // if (password) {
  //   canSave =
  //     [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  // } else {
  //   canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  // }

  //---- CONTENT OBJECT -------------------------------
  // if (transition)
  //   return (
  //     <>
  //       <Loading />
  //     </>
  //   )
  const content = (
    <>
      <div className="flex flex-col justify-center items-center text-sm my-4">
        <form
          // className="flex flex-col gap-2 bg-white rounded-lg w-[60%] p-8 text-gray-500"
          className="border-2 border-red-300 flex flex-col text-gray-600 bg-white w-[70%] p-5 rounded-lg"
          onSubmit={e => e.preventDefault()}
        >
          <label className="flex flex-col text-sm" htmlFor="user-position">
            POSITION:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-position"
              name="user-position"
              type="text"
              value={position}
              onChange={onPositionChanged}
            />
          </label>
          <label className="flex flex-col text-sm" htmlFor="user-number">
            NUMBER:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-number"
              name="user-number"
              type="text"
              value={number}
              onChange={onNumberChanged}
            />
          </label>
          <label className="flex flex-col text-sm" htmlFor="user-age">
            AGE:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-age"
              name="user-age"
              type="text"
              value={age}
              onChange={onAgeChanged}
            />
          </label>
          <label className="flex flex-col text-sm" htmlFor="user-height">
            HEIGHT:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-height"
              name="user-height"
              type="text"
              value={height}
              onChange={onHeightChanged}
            />
          </label>
          <label className="flex flex-col text-sm" htmlFor="user-weight">
            WEIGHT:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-weight"
              name="user-weight"
              type="text"
              value={weight}
              onChange={onWeightChanged}
            />
          </label>
          <label className="flex flex-col text-sm" htmlFor="user-bats">
            BATS:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-bats"
              name="user-bats"
              type="text"
              value={bats}
              onChange={onBatsChanged}
            />
          </label>
          <label className="flex flex-col text-sm" htmlFor="user-throws">
            THROWS:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-throws"
              name="user-throws"
              type="text"
              value={throws}
              onChange={onThrowsChanged}
            />
          </label>
          <label className="flex flex-col text-sm" htmlFor="user-hs">
            HS:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-hs"
              name="user-hs"
              type="text"
              value={hs}
              onChange={onHSChanged}
            />
          </label>
          <label className=" flex flex-col text-sm" htmlFor="user-bio">
            BIO:
            <input
              className="p-2 bg-white rounded-md border-2"
              id="user-bio"
              name="user-bio"
              type="text"
              value={bio}
              onChange={onBioChanged}
            />
          </label>

          <div>
            <button
              className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1 my-3"
              title="Save"
              onClick={onSaveUserClicked}
              // disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
  //---- RETURN THE CONTENT OBJECT ----------------
  return <>{content}</>
}
export default EditUserForm
