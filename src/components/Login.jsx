import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../features/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'


function Login(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')

    const login = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                }
            }

        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='max-w-sm py-4 mx-auto px-4 rounded-xl m-4 bg-white'>
            <div className='flex '>
                <span>
                    <Logo />
                </span>
            </div>
            <p className=' backdrop-blur-2xl text-xl w-max  '>sign in</p>
            <p className='text-gray-600'>Don't have an account!
                <Link to='/signup' className='pl-4 italic underline'>Sign up</Link>
            </p>
            {error && <p className=''>{error}</p>}
            <form
            onSubmit={handleSubmit(login)}
            action=""
            className='mt-4'
            >
                <Input
                label="email"
                type='email'
                placeholder='email'
                className='mb-4 p-2 border border-gray-200'
                {...register('email',{
                    required: true,
                    validate: {
                        matchPattern: (value) => (
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.
                            test(value) || 'Email must be valid!'
                        )
                    }
                })}
                 />
                
                <Input
                label="password"
                type='password'
                placeholder='password'
                className= 'w-full mb-4 p-2 border border-gray-200'
                {...register('password',{
                    required: true,
                })}
                 />
                <Button type='submit' className='w-full bg-blue-400 cursor-pointer p-2'>Sign In</Button>

            </form>


        </div>
    );
}

export default Login;