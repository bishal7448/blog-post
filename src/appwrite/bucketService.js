import configEnv from "../config/configEnv";
import { Client, Storage, ID, Permission, Role } from "appwrite";

export class BucketService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(configEnv.appwriteUrl) // Appwrite Endpoint
            .setProject(configEnv.appwriteProjectId); // Project ID

        this.bucket = new Storage(this.client);
    }

    // Upload a file
    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                configEnv.appwriteBucketId,
                ID.unique(),
                file,
                [
                    Permission.read(Role.any()),
                ]
            );

            if (response) {
                return response;
            } else {
                throw new Error('File upload returned no response');
            }
        } catch (error) {
            throw new Error(`File upload failed: ${error.message}`);
        }
    }

    // Delete a file
    async deleteFile(fileId) {
        try {
            const response = await this.bucket.deleteFile(
                configEnv.appwriteBucketId,
                fileId
            );

            if (response) {
                return true;
            } else {
                throw new Error('File deletion returned no response');
            }

        } catch (error) {
            throw new Error(`File deletion failed: ${error.message}`);
        }
    }

    // Get file preview
    getFilePreview(fileId) {
        return this.bucket.getFileView(
            configEnv.appwriteBucketId,
            fileId
        )
    }

}

const bucketService = new BucketService();

export default bucketService;
