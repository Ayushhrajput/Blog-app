import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../features/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'


export function Login(props) {
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
        <div className='max-w-sm w-max py-4 mx-auto px-4 rounded-xl mx-4 bg-black/90 text-white'>
            <div className='flex '>
                <span>
                    <Logo />
                </span>
            </div>
            <p className=' backdrop-blur-2xl text-xl w-max  '>sign in</p>
            <p className='text-gray-100'>Don't have an account!
                <Link to='/signup' className='pl-4 italic underline'>Sign up</Link>
            </p>
            {error && <p className=''>{error}</p>}
            <form
            onSubmit={handleSubmit(login)}
            action=""
            className='mt-4'
            >
                <Input
                label="Email"
                type='email'
                placeholder='email'
                className='mb-4 p-2 '
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
                label="Password"
                type='password'
                placeholder='password'
                className= 'w-full mb-4 p-2 '
                {...register('password',{
                    required: true,
                })}
                 />
                <Button type='submit' className='w-full cursor-pointer p-2 border border-black/90'>Sign In</Button>

            </form>


        </div>
    );
}
