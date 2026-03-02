import React, { useId } from 'react';

// Select component is an input field that allows users to choose from a dropdown list of options.
function Select(
    {
        label, // Use to maintain accessibility by associating the select element with a label
        options,
        className,
        ...props
    }, ref
) {
    const id = useId();

    return (
        <div className='w-full'>
            {label &&
                <label
                    htmlFor={id}
                    className='inline-block mb-2 font-bold uppercase tracking-wider text-sm'
                >
                    {label}
                </label>
            }
            <select
                className={`px-4 py-3 bg-background text-foreground border-brutal w-full shadow-brutal-sm hover:shadow-brutal focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none cursor-pointer transition-all ${className}`}
                id={id}
                ref={ref}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);
