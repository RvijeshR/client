import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import AuthLayout from './Layouts/AuthLayout';
import MainRoutes from './Routes/MainRoutes';
import AuthRoutes from './Routes/AuthRoutes';
import AuthContext from './Context/AuthContext';

function App() {
  const{isLoggedIn} = useContext(AuthContext)
  // const isLoggedIn = false
  return (
    <div className='bg-gray-100 font-abc'>
      {isLoggedIn ?
        (
          
            <MainLayout>
              <MainRoutes />
            </MainLayout>
          )
        :
        (
         
            <AuthLayout>
              <AuthRoutes />
            </AuthLayout>
         )

      }
    </div>
  );
}

export default App;
