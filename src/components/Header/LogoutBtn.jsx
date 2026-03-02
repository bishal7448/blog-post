import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/authService';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const handelLogout = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
            })
            .finally()
    }

    return (
        <>
            <button className='px-6 py-3 bg-destructive text-destructive-foreground font-bold uppercase tracking-wider shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-solid border-border' onClick={handelLogout}>Logout</button>
        </>
    )
}

export default LogoutBtn;
