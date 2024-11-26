import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
        <Container>
          {/* Image Container with Edit/Delete Buttons for Author */}
          <div className="relative p-2 mb-4 flex justify-center">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="h-auto rounded-md object-cover"
            />
      
            {/* Conditional Edit/Delete Buttons */}
            {isAuthor && (
              <div className="absolute right-4 top-4 flex flex-col space-y-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-black" className="mr-3 my-5">
                    Edit
                  </Button>
                <Button bgColor="bg-black" onClick={deletePost}>
                  Delete
                </Button>
                </Link>
                 
              </div>
            )}
          </div>
      
          {/* Title Section */}
          <div className="w-full mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
              {post.title}
            </h1>
          </div>
      
          {/* Content Section */}
          <div className="browser-css">
            {parse(post.content)}
          </div>
         
        </Container>
      </div>
      
    ) : null;
}
