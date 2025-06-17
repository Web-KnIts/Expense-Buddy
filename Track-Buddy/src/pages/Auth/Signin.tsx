import { useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import z from 'zod'
import type { iloginCredential } from '../types';

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
    email:'',
    password:'',
    error:''
  });
  
  const handleLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const validationResult = zodSchemaValidationForSignIn.safeParse(loginCredential);
    console.log("loginCredential ",loginCredential)
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
          <button type='submit' className='btn-primary'>LOGIN</button>
          <p className='text-[13px] text-slate-800 mt-3'>Don't have an account ?{" "}
            <Link className='font-medium text-red-600 underline' to='/signup'>signup</Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Signin