import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '../index';
import { RTE } from '../index';
import { useDispatch } from 'react-redux';
import { Input } from '../index';
import { Select } from '../index';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../appwrite/config';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const { register, control, handleSubmit, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            status: post?.status || 'active',
            content: post?.content || '',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        console.log("SUBMIT CLICKED");
        console.log(data);
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            // const dbPost = await appwriteService.updatePost
            // (post.$id, {
            //     ...data,
            //     featuredImage: file ? file.$id : undefined,
            //     if(dbPost) {
            //         navigate(`/post/${dbPost.$id}`);   
            //     }    
            // }            
            // )
            const dbPost = await appwriteService.updatePost(
                post.$id,
                {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                }
            );

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }

        else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        }
        return '';
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }));
            }
        })
        return () => { subscription.unsubscribe() };

    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className='max-w-3xl mx-auto p-4'>
            <div className='w-2/3 px-2'>
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
                    onInput={(e) => { setValue('slug', slugTransform(e.target.value), { shouldValidate: true }) }}
                />
                <RTE label="Content :" control={control} name="content" defaultValue={getValues('content')} />
            </div>

            <div className='w-1/3 px-2'>
                <Input
                    type="file"
                    label="Featured Image"
                    placeholder="Featured Image"
                    className="mb-4"
                    accept="image/*"
                    {...register('image', { required: !post })}
                />

                {post && (
                    <div className='w-full mb-4'>
                        <img src={
                            appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}

                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4"
                    {...register('status', { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm