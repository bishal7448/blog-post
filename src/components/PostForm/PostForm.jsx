import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bucketService from '../../appwrite/bucketService';
import databaseService from '../../appwrite/databaseService';
import { Button, Input, Select, RTE } from '../index';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        // pass default values to the form in object format
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            status: post?.status || 'active',
            content: post?.content || ''
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await bucketService.uploadFile(data.image[0]) : null;
            // console.log(file);

            if (file) {
                await bucketService.deleteFile(post.featuredimage);
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : post.featuredimage,

            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image[0] ? await bucketService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;
                const dbPost = await databaseService.createPost({
                    ...data,
                    userId: userData?.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }

            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, '-')
                .substring(0, 36)
                .replace(/^-+|-+$/g, '');
        }
        return '';
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();

    }, [watch, slugTransform, setValue]);

    return (
        <div className="border-brutal border-4 p-6 md:p-10 bg-card shadow-brutal-lg max-w-6xl mx-auto my-8 relative overflow-hidden transition-all duration-300">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary transform translate-x-16 -translate-y-16 rotate-12 opacity-20 -z-10"></div>

            <h1 className="font-anton text-4xl md:text-5xl mb-8 uppercase text-foreground leading-tight tracking-tight">
                {post ? "Edit Post" : "Create New Post"}
            </h1>

            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-4">
                <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
                    <Input
                        label="Title"
                        placeholder="Enter post title"
                        className="mb-6"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug"
                        placeholder="post-url-slug"
                        className="mb-6"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <div className="mt-8">
                        <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                </div>

                <div className="w-full lg:w-1/3 px-4 flex flex-col gap-6">
                    <Input
                        label="Featured Image"
                        type="file"
                        className="mb-2"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full outline-none">
                            <label className='inline-block mb-2 font-bold uppercase tracking-wider text-sm'>Current Image</label>
                            <img
                                src={bucketService.getFilePreview(post.featuredimage)}
                                alt={post.title}
                                className="border-brutal shadow-brutal-sm w-full object-cover aspect-video"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mt-2"
                        {...register("status", { required: true })}
                    />
                    <Button
                        type="submit"
                        bgColor={post ? "bg-chart-5" : "bg-primary"}
                        textColor={post ? "text-[#000]" : "text-primary-foreground"}
                        className="w-full mt-4 py-4 text-lg"
                    >
                        {post ? "Update Post" : "Publish Post"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PostForm
