import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../Context/AuthContext";
import Button from '../Componets/Button';
import { ToastContainer, toast } from 'react-toastify';
import DOMPurify from 'dompurify';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setIsLoading(true);
        const sanitizedName = DOMPurify.sanitize(name);
        const sanitizedEmail = DOMPurify.sanitize(email);
        const sanitizedPassword = DOMPurify.sanitize(password);

        if (!sanitizedName || !sanitizedEmail || !sanitizedPassword) {
            toast.error("Fill all input fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/register', {
                name: sanitizedName,
                email: sanitizedEmail,
                password: sanitizedPassword
            });
           
            // Assuming your API responds with some data upon successful registration
            console.log('Registration successful', response.data);
            toast.success("Registration successful");
            setIsLoading(false);
            // After successful registration, you can redirect the user to a different route
            navigate('/login'); // Redirecting to login page after registration
        } catch (error) {
            toast.error(error);
            setIsLoading(false);
            setError(error);
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 items-center">Register</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" id="name" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <Button className="px-4" isLoading={isLoading} buttonText={'Register'} onClick={handleRegister} />

                <Link to="/login" className="block text-center mt-4 text-blue-500"> Already have an account? Login</Link>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default Register;
