import React, { useEffect, useState } from 'react'
import { Button, Container } from '../components'
import databaseService from '../appwrite/databaseService'
import bucketService from '../appwrite/bucketService'
import { useNavigate, useParams, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) {
                    // console.log("Fetched post from DB:", post);
                    // console.log("Featured Image ID:", post.featuredimage);
                    // console.log("File Preview URL:", post.featuredimage ? bucketService.getFilePreview(post.featuredimage) : "No image");
                    setPost(post);
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                bucketService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-8 relative border-brutal bg-card shadow-brutal p-2">
                    {post.featuredimage ? (
                        <img
                            src={bucketService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="w-full border-brutal"
                        />
                    ) : (
                        <div className="p-10 bg-red-100 text-red-500 border-brutal w-full text-center font-bold">No Featured Image ID Found in Database</div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-primary text-primary-foreground" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-destructive text-destructive-foreground" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-center">
                    <h1 className="font-anton text-4xl md:text-6xl text-foreground">{post.title}</h1>
                </div>
                <div className="browser-css text-lg leading-relaxed text-foreground">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}