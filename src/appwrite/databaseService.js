import configEnv from "../config/configEnv";
import { Client, Databases, Query } from "appwrite";

export class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(configEnv.appwriteUrl) // Appwrite Endpoint
            .setProject(configEnv.appwriteProjectId); // Project ID

        this.databases = new Databases(this.client);
    }

    // Create a new post
    async createPost({ slug, title, content, featuredimage, status, userId }) {
        try {
            const post = await this.databases.createDocument(
                configEnv.appwriteDatabaseId,
                configEnv.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage: featuredimage,
                    status,
                    userid: userId
                }
            )

            if (post) {
                return post;
            } else {
                throw new Error("Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    // Update an existing post
    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                configEnv.appwriteDatabaseId,
                configEnv.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage: featuredimage,
                    status
                }
            )
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }

    // Delete a post
    async deletePost(slug) {
        try {
            const response = await this.databases.deleteDocument(
                configEnv.appwriteDatabaseId,
                configEnv.appwriteCollectionId,
                slug
            )

            if (response) {
                return response;
            } else {
                throw new Error("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    }

    // Get a post by slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                configEnv.appwriteDatabaseId,
                configEnv.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Error getting post:", error);
            throw error;
        }
    }

    // Get all posts
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                configEnv.appwriteDatabaseId,
                configEnv.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Error getting posts:", error);
            throw error;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;
