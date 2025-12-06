const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteId: String(import.meta.env.VITE_APPWRITE_ID),
    appwriteDatabase: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollection: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucket: String(import.meta.env.VITE_BUCKET_ID)
}

export default config