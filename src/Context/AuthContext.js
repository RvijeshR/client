import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
// import {baseURL} from '../config'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isloading, setIsloading] = useState(false)
  const [reloading, setReLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true)
    }
    setReLoading(false);
  }, []);


  const login = async (email, password) => {
     try {
      setIsloading(true)
          const response = await axios.post('http://localhost:3001/login', { email, password });
          console.log('Login successful:', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setIsLoggedIn(true)
          setIsloading(false)
          navigate('/project');
        } catch (error) {
          setIsloading(false)
          console.error('Login error:', error.response.data);
          setError(error.response.data.message);
        }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setIsLoggedIn(false)
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, error, isLoggedIn, isloading }}>
      {reloading ? (<div></div>) :
      children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext