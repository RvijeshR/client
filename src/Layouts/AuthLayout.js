
import login from  '../assets/login.jpg';  

const AuthLayout = ({children}) => {
    return (
        <div className="w-full h-screen flex items-center login_background">
        <div className='hidden lg:block w-full'>
          <img
            className="h-screen  w-11/12 m-auto"
            src={login}
            alt="login Logo"
          />
        </div>
        <div className='w-full flex justify-center px-6'>
        <div className="sm:mx-auto w-full sm:max-w-md">
          <div className="bg-white px-5 sm:px-10 pt-10 md:pt-20 pb-10 md:pb-[60px] rounded-3xl">
            <div className='block lg:hidden w-full mb-4'>
            </div>

            {children}
            
          </div>
        </div>
        </div>
      </div>
    )
  }
  
  export default AuthLayout;