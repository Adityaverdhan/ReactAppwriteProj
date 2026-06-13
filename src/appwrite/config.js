import conf from "../conf/conf.js";
import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client();
    Databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug, content, featuredImage, status, userId}){ 
        try{
            return await this.Databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    slug,
                    content,                    
                    featuredImage,
                    status,
                    userId,

                }
            )
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try{
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }

    async deletePost(slug){
        try{
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.error("Error deleting post:", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.Databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.error("Error fetching post:", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){ 
        try{
            console.log("Database ID:", conf.appwriteDatabaseID);
            console.log("Collection ID:", conf.appwriteCollectionID);
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    }
    //file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            );
            //return response;
        } catch (error) {
            console.error("Error uploading file:", error);
            return false;
        }
    }

    //delete file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }    
    }

    getFilePreview(fileId){
        console.log("FILE ID:", fileId);
        return this.bucket.getFileView(
            conf.appwriteBucketID,
            fileId
        );
    
    }
}

const service = new Service();

export default service;
