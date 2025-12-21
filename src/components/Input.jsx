import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full '>
            {label && <label 
                className='inline, mb-1 pl-1'
                htmlFor={id}
            >
                {label}
            </label>
            }
            <input
                id={id}
                type={type}
                className={`${className} px-4 rounded-lg bg-gray-100 outline-none w-full`}
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default Input;