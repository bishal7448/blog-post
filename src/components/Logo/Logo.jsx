import React from 'react';
import logoImage from '../../assets/logo.png';

function Logo({ width = '100px' }) {
    return (
        <div className="flex items-center justify-center">
            <img
                src={logoImage}
                alt="Blog Logo"
                style={{ width }}
                className="mix-blend-screen"
            />
        </div>
    )
}

export default Logo;
