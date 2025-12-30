import React from 'react';

function Logo({width = '100px', className}) {
    return (
        <div className={`italic text-red-600 text-2xl ${className}`}>
            RedditApp
        </div>
    )
}

export default Logo;