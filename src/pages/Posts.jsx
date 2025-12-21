import React, { useEffect, useState } from 'react';
import service from '../appwrite/serviceConfig';
import { Button, Container } from '../components';
import parse from "html-react-parser";
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Posts(props) {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData? post.userId === userData.$id: false; 

    useEffect(() => {
        if(slug) {
            service.getPost(slug).then((post) => {
                if(post) setPost(post);
                else navigate('/');
            })
        }
    }, [slug, navigate]) 

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if(status) {
                service.deleteFile(post.featuredImgs);
                navigate('/')
            }
        })
    }

    return post? (
        <div className='py-8'>
            <Container>
                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <img src={`https://sfo.cloud.appwrite.io/v1/storage/buckets/693031fa0024d2ae398f/files/${post.featuredImgs}/view?project=692f5e210018bca1c5b4&mode=admin`} alt={post.title} className='rounded-xl' />
                    {isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    className='mr-4'
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button onClick={deletePost}>
                                delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className='w-full bg-6'>
                    <h1>{post.title}</h1>
                </div>
                <div className='browser-css'>{parse(post.content)}</div>
            </Container>
        </div>
    ): null
}

export default Posts;