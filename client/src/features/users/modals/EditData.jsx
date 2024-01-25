import EditUser from '../EditUser'

const ProfileModal = ({ openEditData, onClose, setTransition }) => {
  return (
    <>
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
          openEditData ? 'visible bg-black bg-opacity-80' : 'invisible'
        }`}
      >
        {/* <div className="hero-overlay bg-black bg-opacity-70"> */}
        <div className="flex flex-col min-h-[100%] pt-20 text-white">
          {/* <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900"> */}
          <p className="text-ml md:text-xl text-center">
            Let's complete your profile setup.
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl p-5 text-center">
            Please provide the following data.
          </p>
          <EditUser setTransition={setTransition} />
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default ProfileModal
