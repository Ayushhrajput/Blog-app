import React from 'react';
import { logout } from '../../features/authSlice';
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';

function LogoutBtn(props) {
    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return <button
            className='inline px-4 py-2 duration-100 hover:bg-blue-400 rounded-lg'
           >Logout</button>
}

export default LogoutBtn;