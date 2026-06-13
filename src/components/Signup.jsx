import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { Button } from './index';
import { Logo } from './Logo';
import { Input } from './index';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    console.log("SIGNUP CLICKED", data);
    setError("");
    try {
      //const userData= await authService.createAccount(data);
      const userData = await authService.createAccount(
        data.email,
        data.password,
        data.name
      );
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {dispatch(login({
          userData: {
            $id: userData.$id,
            name: userData.name,
            email: userData.email,
          }
        })); 
      }
        //{ dispatch(login(userData)); }
        navigate("/");
      }
    }
    catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 p-10 rounded-xl border border-black/10`}>
        <div className='flex flex-col items-center justify-center gap-4 mb-5'>
          <span className='text-2xl font-bold'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-2xl font-bold mb-6 text-center'>Signup to create your account</h2>
        <p className='text-center text-sm mb-6 text-gray-600'>Already have an account?
          <Link to="/login" className='text-blue-500 hover:underline'>
            Sign In
          </Link>
        </p>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit(create)} className='space-y-4'>
          <div className='space-y-1'>
            <Input
              label='Full Name'
              placeholder='Type your full name'
              type='text'

              {...register('name', { required: true })}
            />
            <Input
              label='Email'
              placeholder='Type your email'
              type='email'
              {...register('email', { required: true, validate: { matchPatern: (value) => /\S+@\S+\.\S+/.test(value) || 'Email is invalid' } })}
            />
            <Input
              label='Password'
              placeholder='Type your password'
              type='password'
              {...register('password', { required: true, minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            />
            <Button type='submit' className='w-full' onClick={() => console.log("BUTTON WORKS")}>
              Create Account
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Signup