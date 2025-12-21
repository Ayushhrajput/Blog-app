import React, { useEffect, useCallback } from 'react';
import { Button, Input, Select, Rte } from './index';
import service from '../appwrite/serviceConfig';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      title: post?.title || '',
      id: post?.id || '',
      content: post?.content || '',
      status: post?.status || 'active',
      slug: post?.slug || ''
    }
  });

  const title = watch('title');
  const slug = watch('slug');

  const slugTransform = useCallback((value = '') => {
    if(!value) return ""
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_');       
  }, []);

  
  useEffect(() => {
    
    setValue('slug', slugTransform(title), { shouldValidate: true });
    
  }, [title, setValue, slugTransform]);

  const submit = async (data) => {
    try {
      if (post) {
        
        let fileId;
        if (data.image?.[0]) {
          const file = await service.uploadFile(data.image[0]);
          if (file) {
            fileId = file.$id;
            await service.deleteFile(post.featuredImgs);
          }
        }

        const updatedPost = await service.updatePost({
          ...data,
          featuredImgs: fileId || post.featuredImgs
        });

        if (updatedPost) navigate(`/post/${updatedPost.$id}`);
      } else {
        
        let fileId;
        if (data.image?.[0]) {
          const file = await service.uploadFile(data.image[0]);
          fileId = file.$id;
        }

        const newPost = await service.createPost({
          ...data,
          featuredImgs: fileId,
          userId: userData.$id
        });

        if (newPost) navigate(`/post/${newPost.$id}`);
      }
    } catch (error) {
      console.error('Post submit error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />

        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          value={slug}  // controlled input
          readOnly
        />

        <Rte
          label="Content"
          name="content"
          control={control}
          defaultValue={watch('content')}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          className="mb-4"
          {...register('image', { required: !post })}
        />

        {post?.featuredImgs && (
          <div className="w-full mb-4">
            <img
              src={`https://sfo.cloud.appwrite.io/v1/storage/buckets/693031fa0024d2ae398f/files/${featuredImgs}/view?project=692f5e210018bca1c5b4&mode=admin`}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          label="Status"
          options={['active', 'inactive']}
          className="mb-4"
          {...register('status', { required: true })}
        />

        <Button
          type="submit"
          className={`w-full ${post ? 'bg-green-400' : 'bg-blue-400'}`}
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
