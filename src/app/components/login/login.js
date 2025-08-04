import React from 'react'
import Image from 'next/image'

export default function Login() {
  return (
 <div className='flex flex-row space-x-12'> 
    <Image src="/images/login_img.png" alt="Login Illustration" width={600} height={1800} className='w-1/2 h-screen'/>
      
    <div className=' m-20  p-8 '>
        <div className="flex flex-row place-items-center " >
      <div className='flex flex-col space-y-4'>
            <div className='text-3xl text-blue-700 font-bold text-center'>Welcome Back!</div>
            <div className='font-bold font-'> User ID</div>
            <div ><input   type='number' placeholder='User ID ' className=' border-2 rounded-sm w-[400px] h-[40px] border-neutral-400 pl-2 placeholder:text-neutral-400' /> </div>
            <div className='font-bold '> Password</div>
            <div><input type='password' placeholder='Password' className=' border-2 rounded-sm w-[400px] h-[40px] border-neutral-400 pl-2 placeholder:text-neutral-400 '/> </div>
    <div className='flex flex-row'>
         <div className='flex flex-row space-x-28'>
        <div className='flex flex-row space-x-2'>
            <input type='checkbox'  className=' '/> 
            <div className='font-bold '> Remember Me</div>
        </div>
      
         <a href='' className='text-blue-700 '> Forgot Your Password?</a>
        </div>
    </div>
    <button className='font-bold bg-blue-600 text-white hover:bg-blue-400 w-[400px] h-[40px] rounded-sm'> Login</button>
    <div className='flex fles-row space-x-4' > 
        <div className='font-medium'>Don't have an Account?</div>
        <div className='flex flex-row'><a href=' '> Click Here</a></div>       
        </div>
          <div className='mt-40'>
            <div className='font-bold text-center '>
              <p>Powered By Prawncare</p>
            </div>
        </div>
    </div>
  </div>    
 </div>
</div>

  ) 
}
