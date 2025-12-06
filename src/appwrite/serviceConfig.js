import {Client, ID, Databases, Storage, Query} from 'appwrite'
import config from '../config/config'

export class Service {
    client = new Client()
    databases
    storage

    constructor() {
        this.client
            .setProject(config.appwriteId).setEndpoint(config.appwriteUrl)
        this.databases = new Databases()
        this.storage = new Storage()
    }

    async createPost({title, content, featuredImgs, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabase,
                config.appwriteCollection,
                ID.unique, 
                {
                    title,
                    content,
                    featuredImgs,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost({title, content, featuredImgs, status, userID}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabase,
                config.appwriteCollection,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImgs,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }
    async deletePost({}){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabase,
                config.appwriteCollection,
                ID.unique()
            )
            return true
        } catch (error) {
            console.log(error)
            return false
            
        }
    }

    async getPost({}){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabase,
                config.appwriteCollection,
                ID.unique()
            )
        } catch (error) {
            console.log(error)
        }
    }
    async getPosts(queries = [Query.equal('ststus','active')]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabase,
                config.appwriteCollection,
                queries
            )
        } catch (error) {
            console.log(error)
        }
    }
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucket,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error)
        }
    }
    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                config.appwriteBucket,
                fileId
            )

        } catch (error) {
            console.log(error)
            return false
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucket,
            fileId
        )
    }
}   


const service = new Service()

export default service