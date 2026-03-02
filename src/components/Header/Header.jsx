import React from 'react';
import { Container, Logo, LogoutBtn } from '../';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector(state => state.auth.isAuthenticated)

    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Sign Up',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        }
    ]

    return (
        <header className='border-b-brutal border-b-4 bg-background sticky top-0 z-50'>
            <Container>
                <nav className='flex items-center justify-between py-6'>
                    <div className='mr-4'>
                        <Link to='/' className="font-anton text-4xl md:text-5xl tracking-tight hover:text-primary transition-colors">
                            <Logo width='120px' />
                        </Link>
                    </div>
                    <ul className='flex items-center space-x-4 ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-solid border-border'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
