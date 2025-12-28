import React from 'react';
import { logout } from '../../features/authSlice';
import {Container, LogoutBtn, Logo} from '../index.js'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header(props) {
    const authStatus = useSelector((state) => (state.auth.status))
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            path: '/',
            active: 'true'
        }, {
            name: 'Login',
            path: '/login',
            active: !authStatus
        }, {
            name: 'Signup',
            path: '/signup',
            active: !authStatus
        },{
            name: 'All posts',
            path: '/all-posts',
            active: authStatus
        },{
            name: 'Add Post',
            path: '/add-post',
            active: authStatus
        }
    ]

    return (
        <header className='py-2 shadow w-full'>
            <Container className=''>
                <div className='flex gap-25 '>
                    <div className='mx-4 flex items-center'>
                        <Link>
                            <Logo />
                        </Link>
                    </div>
                    <div className='flex justify-end   items-center bg-black/90 backdrop-blur-lg border border-black/40 text-white p-4 rounded-2xl mx-auto'>
                        {navItems.map((item) => (
                            item.active? 
                            <li key={item.name} className='list-none flex mx-4  hidden md:inline'>
                                <button
                                    onClick={() => navigate(item.path)}
                                    className='mr-4'
                                >{item.name}</button> 
                            </li>: null    
                        ))}
                        <div className='relative'>
                            <button className=' border-b-2 focus:border-0 mx-4 peer md:hidden'>More</button>
                            <div className='flex  items-center bg-black/90 backdrop-blur-lg border border-black/40 shadow-lg shadow-black text-white rounded-2xl absolute top-14 right-2 p-4 opacity-0 peer-focus:opacity-100 duration-400 '>{navItems.map((item) => (
                                item.active? 
                                <li key={item.name} className='list-none flex ml-4 w-max'>
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className='mr-4'
                                    >{item.name}</button> 
                                </li>: null    
                            ))}
                            </div>
                        </div>
                         {
                            authStatus && (
                                <LogoutBtn />
                            )
                        }
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;