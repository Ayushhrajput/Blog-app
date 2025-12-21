import React from 'react';
import Service from '../appwrite/serviceConfig';
import { Link } from 'react-router-dom';

function Card({post}) {
    const {$id, title, featuredImgs} = post || {};
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full px-4 rounded-xl '>
                <div className='flex justify-center w-full mb-4 rounded-xl'>
                    {featuredImgs ? (
                        <img
                        src={`https://sfo.cloud.appwrite.io/v1/storage/buckets/693031fa0024d2ae398f/files/${featuredImgs}/view?project=692f5e210018bca1c5b4&mode=admin`}
                        alt={title || 'Post image'}
                        className="w-full h-40 object-cover rounded-xl"
                        />
                    ) : (
                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                        No Image
                        </div>
                    )}
                </div>
                <div>
                    <h1>{title}</h1>
                </div>

            </div>
        </Link>
    );
}

export default Card;