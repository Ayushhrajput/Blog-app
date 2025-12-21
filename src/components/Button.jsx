import React from 'react';

function Button({
    children,
    type = 'button',
    className = '',
    ...props
}) {
    return (
        <button className={`${className} bg-gray-900 rounded-lg text-white`}{...props}>
            {children}
        </button>
    )
}

export default Button;