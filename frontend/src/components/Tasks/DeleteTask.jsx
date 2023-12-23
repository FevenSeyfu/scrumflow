import React from "react";
import { useDispatch, useSelector } from "react-redux";
import  { deleteTask} from '../../features/Tasks/taskSlice'
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";
Modal.setAppElement("#root");

const DeleteTask = ({taskId, onClose}) => {
  const dispatch = useDispatch();
  const {tasks,isError,isLoading,isSuccess,message} = useSelector((state) => state.task);

  const handleDelete = async() => {
    await dispatch(deleteTask(taskId));
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      onClose()
      toast.warn('Task Deleted!')
    }
  };
  return (
    <Modal
    isOpen={true}
    contentLabel="Delete Task"
    className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
    overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    onRequestClose={onClose}
    shouldCloseOnOverlayClick={true}
  >
    <div className="bg-white text-black p-8 mx-12 rounded">
      <div className="flex justify-end">
        <MdClose size={30} onClick={onClose} />
      </div>
      <h2 className="font-bold text-2xl text-center mb-4">Delete Task</h2>
      {isLoading && <FaSpinner />}
      <p>Are you sure you want to delete this Task?</p>
      <div className="flex flex-row justify-evenly mt-4">
        <button
          className="bg-red text-white p-2 rounded-md"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        <button className="bg-gray text-white p-2 rounded-md" onClick={onClose} disabled={isLoading}>
          Cancel
        </button>
      </div>
      {isError && toast.error(message)}
      
    </div>
  </Modal>
  )
}

export default DeleteTask