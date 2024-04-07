import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

function Navbar() {
  const [profileClick, setProfileClick] = useState(false);
  const { logout } = useContext(AuthContext);
  const handleSignOut = () => {
    logout();
  };
  return (
    <nav className='bg-white shadow-sm '>
      <div className="px-2 sm:px-6">
        <div className="justify-end relative flex h-[65px] md:h-[80px] items-center md:justify-between ">
          <div className="hidden text-xl font-semibold text-gray-500 cursor-pointer md:block">
            Welcome
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              {/* <NotificationIcon /> */}
            </button>

            <div className="relative ml-3">
              <div
                onClick={()=>{setProfileClick(!profileClick)}}
              >
                <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

                <div className={`absolute ${profileClick?"block":"hidden"} h-auto right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                  <div>
                      <button
                        className= 'block px-4 py-2 text-sm w-full text-start text-gray-700 cursor-pointer hover:bg-gray-400'
                        onClick={handleSignOut}
                      >
                        Sign out
                      </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;