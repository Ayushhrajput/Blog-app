import React from 'react';
import {Button, Input, Select, Rte} from './index'
import service from '../appwrite/serviceConfig'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'

function PostForm({post}) {
    const {register, handleSubmit, control, setValue, getValue, watch} = useForm({
        defaultValues: {
            title: post?.title || '',
            id: post?.id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })

    const navigate  = useNavigate()
    const userData  = useSelector((state) => state.auth.userData)
    
    return (
        <div>
            
        </div>
    );
}

export default PostForm;