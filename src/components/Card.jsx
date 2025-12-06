import React from 'react';
import Service from '../appwrite/serviceConfig';
import { Link } from 'react-router-dom';
import service from '../appwrite/serviceConfig';

function Card({$id, title, featuredImg}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full px-4 rounded-xl '>
                <div className='flex justify-center w-full mb-4 rounded-xl'>
                    <img src={service.getFilePreview(featuredImg)} alt="" />
                </div>
                <div>
                    <h1>{title}</h1>
                </div>

            </div>
        </Link>
    );
}

export default Card;