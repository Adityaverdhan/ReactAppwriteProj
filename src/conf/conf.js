// const conf = {
//     appwriteURL: String(import.meta.env.VITE_APP_APPWRITE_URL),
//     appwriteProjectID: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
//     appwriteDatabaseID: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),
//     appwriteCollectionID: String(import.meta.env.VITE_APP_APPWRITE_USERS_COLLECTION_ID),
//     appwriteBucketID: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID),
// };

// export default conf;
// const conf = {
//   appwriteURL: "https://fra.cloud.appwrite.io/v1",
//   appwriteProjectID: "6a0ec2ff001a2bb56ba7",
// };

// export default conf;
const conf = {
  appwriteURL: String(import.meta.env.VITE_APP_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),
  appwriteCollectionID: String(import.meta.env.VITE_APP_APPWRITE_USERS_COLLECTION_ID),
  appwriteBucketID: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID),
};

export default conf;
console.log(conf);