import Navbar from '../Containers/Navbar';
import Sidebar from '../Containers/Sidebar';

const MainLayout = ({children}) => {
    return(
    <div className='flex'>
            <Sidebar/>
        <div className='relative w-full'>
            <Navbar />
            <div className='w-full max-w-[4000px] mx-auto px-3 md:px-6 overflow-y-auto h-screen md:h-[calc(100vh-80px)] scroll-stable'>
            {children}
            </div>
        </div>
    </div>
)}

export default MainLayout;