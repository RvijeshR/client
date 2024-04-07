import React, { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '../assets/svg/Delete';
import Cancel from '../assets/svg/Cancel';
import { ToastContainer, toast } from 'react-toastify';


function TaskPopup({ task, onDelete, onClose }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedTask({ ...task });
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const header = {
      Authorization: `Bearer ${token}`
    };
    if(user){
      editedTask.id = user._id
    }

    try {
      await axios.put(`http://localhost:3001/api/tasks/${task._id}`, editedTask, { headers: header });
      setIsEditMode(false);
      toast.success("edit successfully");
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error("Failed to edit task");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setEditedTask(prevState => ({
      ...prevState,
      status: value
    }));
  };

  return (
    <div className="w-10/12 bg-white p-8 rounded shadow-md justify-center items-center">
      {/* <div className="top-0 right-0 m-4 cursor-pointer" onClick={onClose}><Cancel /></div> */}
      <div className="flex items-center justify-between mb-4">
        {isEditMode ? (
          <input
            type="text"
            className="text-2xl font-bold w-11/12 mb-4 border-2 border-gray-200"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
        ) : (
          <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        )}
        {/* <button className="focus:outline-none" onClick={handleDelete}>
          <DeleteIcon />
        </button> */}
        <div className="top-0 right-0 m-4 cursor-pointer" onClick={onClose}><Cancel /></div>
      </div>
      {isEditMode ? (
        <React.Fragment>
          <textarea
            className="text-sm mb-4 w-11/12 border-2 border-gray-200"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
          <input
            type="date"
            className="text-sm mb-4 border-2 border-gray-200"
            name="deadline"
            value={formatDate(editedTask.deadline)}
            onChange={handleChange}
          />
          <select
            className="text-sm mb-4 border-2 border-gray-200"
            name="status"
            value={editedTask.status}
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="text-sm mb-4">{task.description}</p>
          <p className="text-sm mb-4">{formatDate(task.deadline)}</p>
          <p className="font-bold">{task.status}</p>
        </React.Fragment>
      )}
      {isEditMode ? (
        <div className="flex justify-between">
          <button className="px-4 py-2 mt-4 bg-gray-800 text-white rounded" onClick={handleSaveEdit}>Save</button>
          <button className="px-4 py-2 mt-4 bg-gray-800 text-white rounded" onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div className="flex justify-between">
          <button className="px-4 py-2 mt-4 bg-gray-800 text-white rounded" onClick={handleEdit}>Edit</button>
          <button className="px-4 py-2 mt-4 bg-gray-800 text-white rounded" onClick={handleDelete}>
           Delete
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default TaskPopup;
