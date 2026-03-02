import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../appwrite/databaseService'

function AllPost() {
    const [posts, setPosts] = useState([]) // Store posts

    useEffect(() => {
        databaseService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .catch((err) => console.error(err))
    }, []) // Fetch posts from Appwrite database on component mount



    return (
        <div className='w-full py-8'>
            <div className="mb-12 text-center transition-all duration-700">
                <h1 className="font-anton text-6xl md:text-8xl mb-6 -rotate-2 inline-block">
                    ALL POSTS
                </h1>
                <div className="w-32 h-2 bg-primary mx-auto rotate-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <PostCard key={post.$id} {...post} index={index} />
                ))}
            </div>
        </div>
    )
}

export default AllPost
