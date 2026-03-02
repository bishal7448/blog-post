const configEnv = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    lingoDotDevApiKey: String(import.meta.env.VITE_LINGO_DOT_DEV_API_KEY),
    tinymceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
}

export default configEnv;
