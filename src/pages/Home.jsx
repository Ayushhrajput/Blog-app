import React, { useEffect, useState } from 'react';
import service from '../appwrite/serviceConfig';
import { Container, PostForm } from '../components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Card} from '../components';

function Home(props) {

    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData); 
    

    useEffect(() => {
        
            service.getPosts().then((post) => {
                if(post){
                    setPosts(post.documents);
                } else{
                    setPosts([])
                }
            })
        
        
    }, [])
    if(posts.length === 0){
        return (<div className='w-full py-8 mt-4 text-center h-screen content-center'>
                    <Container>
                        <div className='flex flex-wrap'>
                            <div className='p-2 w-full'>
                                <h1 className=''>Login to get Started</h1>
                            </div> 
                        </div>
                    </Container>
                </div>)
    }
    
    return (
        <div className='w-full py-8 h-screen'>
            <Container>
                    <div className='flex-flex-wrap'>
                        {posts.map((post) => {
                            const isAuthor =  userData? post.userId === userData.$id: false;
                            return isAuthor && (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <Card post={post} /> 
                                </div>
                            )  
                        })}
                    </div>
            </Container>
        </div>
    )
}

export default Home;