import React from 'react';
import Logo from '../Logo';

function Footer(props) {
    return (
        <div className='bg-white w-full'>
            <div className='flex justify-center items-center h-40'>
                <div className=' px-4 w-1/4'>
                    <Logo className={`sm:text-4xl sm:px-20`}/>
                </div>
                <div className='w-max flex items-center justify-center text-lg md:text-2xl bg-black/90 backdrop-blur-lg border border-black/40 text-white p-4 rounded-2xl'>
                    <h1>Internet chaos, neatly organized.</h1>
                </div>
            </div>
            <div className='px-4 py-4 italic'>
                <p>Built using React.js, Appwrite</p>
            </div>
        </div>
        
    );
}

export default Footer;