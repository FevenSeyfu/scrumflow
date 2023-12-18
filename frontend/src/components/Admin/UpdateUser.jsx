import React from 'react'
import Modal from "react-modal";

const UpdateUser = ({userId,onClose}) => {
  return (

      <Modal
      isOpen={true}
      contentLabel="Write Comment"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <p>userID: {userId}</p>
      <button onClick={onclose}>x</button>
      </Modal>
  )
}

export default UpdateUser