import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {login as AuthSignup} from '../features/authSlice'
import {Input, Button, Logo} from './index'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


 export function SignupPage(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')

    const signup = async (data) => {
        try {
            const session = await authService.createAccount(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(AuthSignup(userData))
                    navigate('/')
                }
            }
            
        } catch (error) {
            setError(error.message)
        }
    }

    return (
            <div className='max-w-sm py-4 mx-auto px-4 rounded-xl mx-4 bg-black/90 text-white'>
                    <div className='flex '>
                        <span>
                            <Logo />
                        </span>
                    </div>
                    <p className=' backdrop-blur-2xl text-xl w-max  '>sign up</p>
                    <p className='text-gray-100'>Already have an account!
                        <Link to='/login' className='pl-4 italic underline'>Sign In</Link>
                    </p>
                    {error && <p className=''>{error}</p>}
                    <form
                    onSubmit={handleSubmit(signup)}
                    action=""
                    className='mt-4'
                    >   <Input 
                        label='Name'
                        type='text'
                        placeholder='fullname'
                        className='mb-4 p-2 '
                        {...register('name',{
                            required: true
                        })}
                        />
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
                        <Button type='submit' className='w-full cursor-pointer p-2 border border-black/90'>Create Account</Button>
        
                    </form>
        
        
            </div>
    )
}
