import { useEffect, useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod'
import type { iloginCredential, iUserResponse } from '../types';
import axiosInstance from '../../services/axiosInstance';
import { API_PATH } from '../../services/apiPath';
import { useUserContext } from '../../context/userContext';

const zodSchemaValidationForSignIn = z.object({
  email:z.string().email('Invalid Email'),
  password:z.string().min(8,'Password must be at least 8 char').refine((val) => /[A-Z]/.test(val), {
          message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[a-z]/.test(val), {
          message: "Password must contain at least one lowercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
          message: "Password must contain at least one number",
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
          message: "Password must contain at least one special character",
        }),
})

const Signin = () => {
  const [loginCredential,setLoginCredentials] = useState<iloginCredential>({
    email:'test@gmail.com',
    password:'Test@123',
    error:''
  });

  const navigate = useNavigate(); 
  const {updateUser} = useUserContext();
  const handleLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const validationResult = zodSchemaValidationForSignIn.safeParse(loginCredential);
 
    if(!validationResult.success)
    {
      setLoginCredentials((prev)=>({
        ...prev,
        error:validationResult.error.errors[0].message || "Validation Error"
      }));
      return ;
    }
    setLoginCredentials((prev)=>({
        ...prev,
        error:""
      }));
      console.log(loginCredential)
      try{
        const response = await axiosInstance.post(API_PATH.AUTH.LOGIN,{
          email:loginCredential.email,
          password:loginCredential.password
        });
         console.log(response)
        const {token,user} = response.data as iUserResponse;
        if(token){
          localStorage.setItem('token',token);
          updateUser(user);
          navigate('/dashboard');``
        }
      }
      catch(err : any)
      {
        console.log(API_PATH.AUTH.LOGIN," --------------------------------------------------")
        console.log('Error : ',err)
        console.log("-------------------------------------------------------------------------")
         if(err.response && err.response.data.message){
          setLoginCredentials((prev)=>({
        ...prev,
        error:err.response.data.message || "Validation Error"
        }));
         }
         else
         {
          setLoginCredentials((prev)=>({
        ...prev,
        error:err.response?.data?.message || "Validation Error"
        }));
         }
      }

  }


  return (
    <AuthLayout>
      <div className='lg:w-[70%] md:h-full h-3/4 mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter details to Log in
        </p>

        <form onSubmit={handleLogin}>
          <Input 
            value={loginCredential.email}
            label={"Email address"}
            onChange={({target})=>setLoginCredentials(prev => ({
              ...prev,email:target.value
            }))}
            placeholder={'hello@gmail.com'}
            type='text'
          />
          <Input 
            value={loginCredential.password}
            label={"Password"}
            onChange={({target})=>setLoginCredentials(prev => ({
              ...prev,password:target.value
            }))}
            placeholder={'Min 8 character'}
            type='password'
          />
          {loginCredential.error && <p className='text-red-950 text-xs pb-2.5'>{loginCredential.error}</p>}
          <button type='submit' className='btn-primary cursor-pointer'>LOGIN</button>
          <p className='text-[13px] text-slate-800 mt-3'>Don't have an account ?{" "}
            <Link className='font-medium text-red-600 underline' to='/signup'>signup</Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Signin