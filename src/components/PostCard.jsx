import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  console.log("Image ID:", featuredImage);
//console.log(appwriteService.getFilePreview(featuredImage));
  console.log({ $id, title, featuredImage });
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-200 rounded-xl p-4'>
        <div className='w-full justiufy-center mb-4'>
          {featuredImage && (<img src={appwriteService.getFilePreview(featuredImage)} 
          alt={title} className='rounded-xl' />)}

        </div>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard