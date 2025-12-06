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
        <header className='py-2 shadow bg-white'>
            <Container>
                <div>
                    <div>
                        <Link>
                            <Logo />
                        </Link>
                    </div>
                    <div>
                        {navItems.map((item) => (
                            item.active? 
                            <li key={item.name} className='list-none'>
                                <button
                                    onClick={navigate(item.path)}
                                    className='ml-auto '
                                >{item.name}</button> 
                            </li>: null    
                        ))} {
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