import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'; 

function Sidebar() {
  const [activeLink, setActiveLink] = useState("");
  
 useEffect(()=>{
  const currentPath = window.location.pathname;
  setActiveLink(currentPath)
 },[])

  return (
    <div className="sidebar h-screen w-72 md:w-[13rem] overflow-y-auto text-center bg-gray-900">
      <div className="bg-white h-[65px] md:h-[80px] md:pl-[15px] md:pt-[20px]">
        <div className='block md:hidden absolute bg-white h-[65px] md:h-[80px] pl-[20px] pt-[20px]'>
        </div>
      </div>
      <div className='mt-8 z-50'>
        <Link to="/project" className={`p-5 ${activeLink === '/project' ? 'text-gray-50 bg-blue-950' : 'text-gray-500'} flex md:flex-col items-end md:items-center rounded-md px-4 duration-300 cursor-pointer mx-2 hover:text-gray-50`}
        onClick={() => { setActiveLink("/project")}}>
          <span className="text-[15px] mt-3 text-inherit font-bold">Task List</span>
        </Link>
        <Link to="/newTask" className={`p-5 ${activeLink === '/newTask' ? 'text-gray-50 bg-blue-950' : 'text-gray-500'} flex md:flex-col items-end md:items-center rounded-md px-4 duration-300 cursor-pointer mx-2 hover:text-gray-50`}
        onClick={() => { setActiveLink("/newTask")}}>
          <span className="text-[15px] mt-3 text-inherit font-bold">Create New Task</span>
        </Link> 
        {/* Add other links here */}
      </div>
    </div>
  );
}

export default Sidebar;
