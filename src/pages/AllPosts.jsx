import React, { useEffect, useState } from 'react';
import { Card, Container } from '../components';
import service from '../appwrite/serviceConfig';

function AllPosts(props) {
    
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getPosts([]).then((res) => {
            if(res) {
                setPosts(res.documents || [])
            }
        })
    },[])
    
    if(posts.length === 0){
        return (
            <div>There is no post yet!</div>
        )
    }
    return (
        <div className='w-full py-4'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Card post={post}/> 
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;