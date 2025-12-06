import React, { useId } from 'react';

function Select({
    label,
    className,
    options,
    ...props
}, ref) {
    
    const id = useId()
    return (
        <div>
            {label && <label htmlFor={id} className=''>{label}</label>}
            <select id={id}
                className={`${className} outline-none px-4 py-2 w-full rounded-lg focus:bg-gray-100 duration-100 `}
                {...props} ref={ref}>
                    {options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)