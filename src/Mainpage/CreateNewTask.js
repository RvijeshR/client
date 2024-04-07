import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Componets/Button';
import DOMPurify from 'dompurify'; // Import DOMPurify library

function CreateNewTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('Pending');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const createTask = async () => {
        if (!title || !description || !deadline) {
            toast.error("Please fill all fields");
            return;
        }
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const header = {
            Authorization: `Bearer ${token}` 
        }
        try {
            // Sanitize inputs before sending them to the server
            const sanitizedTitle = DOMPurify.sanitize(title);
            const sanitizedDescription = DOMPurify.sanitize(description);
            const sanitizedDeadline = DOMPurify.sanitize(deadline);

            const response = await axios.post('http://localhost:3001/api/tasks', {
                id:user._id,
                title: sanitizedTitle,
                description: sanitizedDescription,
                deadline: sanitizedDeadline,
                status
            },{ headers: header });

            console.log('Task created successfully:', response.data);
            setIsLoading(false);
            setTitle('');
            setDescription('');
            setDeadline('');
            setStatus('Pending');
            // Display toast message
            toast.success(response.data.message);
        } catch (error) {
            setIsLoading(false);
            // setError(error);
            // toast.error(error.message);
            toast.error(error);
            console.error('Task creation error:', error);
        }
    };

    return (
        <div className="my-5 mx-5 w-10/12 justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 items-center">Create New Task</h2>
                {error && (
                    <div className="justify-center items-center text-red-500 mb-4 rounded-lg border border-red-600 p-4 bg-red-200">
                        {error.message}
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input type="text" id="title" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea id="description" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="deadline" className="block text-gray-700">Deadline</label>
                    <input type="date" id="deadline" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700">Status</label>
                    <select id="status" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <Button className="px-4" isLoading={isLoading} buttonText={'Register'} onClick={createTask} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default CreateNewTask;
