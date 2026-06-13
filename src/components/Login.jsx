import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { Button } from './index';
import { Logo } from './Logo';
import { Input } from './index';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      //const session = await authService.login(data);
      const session = await authService.login(
        data.email,
        data.password
      );
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          //dispatch(authLogin({ userData }));
          dispatch(authLogin({
            userData: {
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            }
          }));
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div className='w-full flex items-center justify-center bg-gray-100'>
      <div className={`mx-auto w-full max-w-md bg-gray-100  roiunded-xl p-8 border border-black/10`}>
        <div className='mb-2 flex items-center justify-center'>
          <span className='inline-block w-full max-w-[100px] font-bold'>
            <Logo width='100%' />
          </span>

        </div>
        <h2 className='text-2xl font-bold mb-6 text-center'>Sign in to your account</h2>
        <p className='text-center text-sm mb-6 text-gray-600'>Don't have an account?
          <Link to="/signup" className='text-blue-500 hover:underline'>Sign up</Link>
        </p>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='space-y-4'>
          <div className='space-y-1'>

            <Input label='Email' placeholder='Type your email' type='email' id='email' {...register('email', { required: true, validate: { matchPatern: (value) => /\S+@\S+\.\S+/.test(value) || 'Email is invalid' } })} />
            <Input label='Password' placeholder='Type your password' type='password' id='password' {...register('password', { required: true })} />
            <Button type='submit' className='w-full'>Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default Login