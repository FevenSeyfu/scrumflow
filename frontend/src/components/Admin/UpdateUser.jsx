import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#root");
const UpdateUser = ({ userId, onClose }) => {
  return (
    <Modal
      isOpen={true}
      contentLabel="Update User"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onRequestClose={onClose}  
      shouldCloseOnOverlayClick={true}  
    >
      <div className="bg-white p-8 rounded">
        <p>userID: {userId}</p>
        <button onClick={onClose}>x</button>
      </div>
    </Modal>
  );
};

export default UpdateUser