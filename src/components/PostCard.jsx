import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
  {/* Image Container */}
  <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 flex justify-center items-center">
    <img
      src={appwriteService.getFilePreview(featuredImage)}
      alt={title}
      className="w-full h-full object-cover rounded-t-lg"
    />
  </div>

  {/* Title */}
  <div className="p-4">
    <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 text-center line-clamp-2">
      {title}
    </h2>
  </div>
</div>

    </Link>
  );
}

export default PostCard;

{/* <div className=" max-w-xs bg-gray-100 rounded-xl p-3 transition-transform duration-300 hover:scale-105">
<div className="w-full flex justify-center mb-2">
  <img
    src={appwriteService.getFilePreview(featuredImage)}
    alt={title}
    className="rounded-xl object-cover w-full h-24 sm:h-28 md:h-32 lg:h-40"
  />
</div>

<h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 text-center truncate">
  {title}
</h2>
</div> */}