import React, { useId } from 'react';

const Input = React.forwardRef(
    function Input({
        label,
        type = 'text',
        className = '',
        placeholder = '',
        ...props
    }, ref) {
        const id = useId();

        return (
            <div className='w-full'>
                {label &&
                    <label
                        className='inline-block mb-2 font-bold uppercase tracking-wider text-sm'
                        htmlFor={id}
                    >
                        {label}
                    </label>}
                <input
                    type={type}
                    id={id}
                    className={`px-4 py-3 bg-background text-foreground border-brutal w-full shadow-brutal-sm hover:shadow-brutal focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all ${className}`}
                    placeholder={placeholder}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)

export default Input;
