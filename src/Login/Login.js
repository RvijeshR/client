import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../Context/AuthContext";
import Button from '../Componets/Button';
import { ToastContainer, toast } from 'react-toastify';
import DOMPurify from 'dompurify';

function Login() {
    const { login,  error, isloading } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const sanitizedEmail = DOMPurify.sanitize(email);
        const sanitizedPassword = DOMPurify.sanitize(password);

        if(!sanitizedEmail || !sanitizedPassword){
            toast.error("fill all input fields")
            return;
        }

        await login(sanitizedEmail, sanitizedPassword);
        if(error){
            toast.error(error)
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 items-center">Login</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">Email</label>
                    <input type="text" id="username" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" className="w-full border border-gray-300 rounded px-3 py-2"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <Button className="px-4" isLoading={isloading} buttonText={'Login'} onClick={handleLogin} />

                <Link to="/signup" className="block  mt-4 text-blue-500"> Sign up</Link>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default Login;
