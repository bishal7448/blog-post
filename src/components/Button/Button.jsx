import React from 'react';

function Button({
    children,
    type = 'button',
    onClick,
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            className={`px-6 py-3 font-bold uppercase tracking-wider shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-solid border-border ${bgColor} ${textColor} ${className}`}
            type={type}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;
