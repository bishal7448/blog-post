import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../../store/authSlice';
import authService from '../../appwrite/authService';
import { Button, Input, Logo } from '../index';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = React.useState(null);

    const login = async (data) => {
        setError('');

        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                }

            }

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <div className='flex items-center justify-center w-full'>
                <div className={`mx-auto w-full max-w-lg bg-card p-10 border-brutal shadow-brutal`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Login to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p
                    className='text-red-600 mt-8 text-center'
                >{error}</p>}
                {/* handleSubmit is a event handler that wraps the login function */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email'
                            type='email'
                            placeholder='Enter your email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    // regex - regular expression for email validation
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                                        "Password must contain at least 8 characters, including UPPER/lowercase and numbers",
                                }
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
