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

    return <div className='flex flex-col'>
            <button
                onClick={logoutHandler}
                className='inline peer'
            >Logout</button>
            <div className='w-0 bg-black h-[2px] peer-hover:w-full duration-100'></div>
           </div>
            
}

export default LogoutBtn;