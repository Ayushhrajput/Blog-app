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
        <header className='py-2 shadow w-full bg-white'>
            <Container className=''>
                <div className='flex'>
                    <div className='mx-4 flex items-center'>
                        <Link>
                            <Logo />
                        </Link>
                    </div>
                    <div className='flex w-full justify-end   items-center mx-auto'>
                        {navItems.map((item) => (
                            item.active? 
                            <li key={item.name} className='list-none flex mx-4 w-max hidden md:inline'>
                                <button
                                    onClick={() => navigate(item.path)}
                                    className='mr-4'
                                >{item.name}</button> 
                            </li>: null    
                        ))}
                        <div className='relative'>
                            <button className=' border-b-2 focus:border-0 mx-4 peer md:hidden'>More</button>
                            <div className='flex flex-col items-center bg-black/10 rounded-sm absolute top-14 right-2 p-4 opacity-0 peer-focus:opacity-100'>{navItems.map((item) => (
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