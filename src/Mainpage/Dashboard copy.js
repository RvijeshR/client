import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskPopup from './Taskpopup';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const header = {
        Authorization: `Bearer ${token}`
      };
      const response = await axios.get('http://localhost:3001/api/tasks', { headers: header });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const isOverdue = (deadline) => {
    const today = new Date();
    const taskDeadline = new Date(deadline);
    return taskDeadline < today;
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const header = {
        Authorization: `Bearer ${token}`
      };
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`, { headers: header });
      fetchTasks();
      setShowPopup(false); // Close the popup after deleting
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    fetchTasks();
  };

  // Filter tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-5 flex-wrap flex justify-stretch">
        <div>
          <h2 className='text-xl mb-5'>Pending Tasks</h2>
          {pendingTasks.map(task => (
            <div key={task._id} className={`flex-wrap relative p-4 rounded bg-red-100 m-2 border-2 border-red-200 ${isOverdue(task.deadline) ? 'bg-red-200' : 'bg-gray-200'}`} onClick={() => handleTaskClick(task)}>
              {isOverdue(task.deadline) && (
              <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-tl-md rounded-br-md">
                Overdue
              </div>
            )}
              <h3 className="my-5 text-xl">{task.title}</h3>
              <div className="mb-2 text-sm">
                {task.description.length > 50 ? `${task.description.substring(0, 50)}...` : task.description}
              </div>
              <div className="flex justify-between flex-wrap">
                <p className="text-sm text-gray-500">{formatDate(task.deadline)}</p>
                <p className={`text-sm ${isOverdue(task.deadline) ? 'text-red-500' : 'text-gray-900'}`}>
                  {task.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className='text-xl mb-5'>Completed Tasks</h2>
          {completedTasks.map(task => (
            <div key={task._id} className=" flex-wrap relative p-4 rounded bg-green-100 m-2 border-2 border-green-200" onClick={() => handleTaskClick(task)}>
              
              <h3 className="my-5 text-xl">{task.title}</h3>
              <div className="mb-2 text-sm">
                {task.description.length > 50 ? `${task.description.substring(0, 50)}...` : task.description}
              </div>
              <div className="flex justify-between flex-wrap">
                <p className="text-sm text-gray-500">{formatDate(task.deadline)}</p>
                <p className="text-sm text-green-500">
                  {task.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && selectedTask && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <TaskPopup task={selectedTask} onDelete={handleDelete} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
