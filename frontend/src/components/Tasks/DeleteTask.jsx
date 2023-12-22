import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  { deleteTask} from '../../features/Tasks/taskSlice'
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";

Modal.setAppElement("#root");

const DeleteTask = ({taskId,project_id, onClose}) => {
  const dispatch = useDispatch();
  return (
    <div>DeleteTask</div>
  )
}

export default DeleteTask