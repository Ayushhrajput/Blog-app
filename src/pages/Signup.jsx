import React from 'react';
import {SignupPage as SignupComponent} from '../components/Signup';

function Signup(props) {
    return (
        <div className='h-screen content-center'>
            <SignupComponent />
        </div> 
    );
}

export default Signup;