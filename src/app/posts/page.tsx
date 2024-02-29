"use client";

import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import Post from "@/types/Post";
import Link from "next/link";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3000/api/posts");
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-5 p-10">
      <div className="flex flex-col">
        <span className="font-medium hover:font-extrabold">
          <Link href={"/"}>Back</Link>
        </span>
        <span className="font-medium hover:font-extrabold">
          <Link href={"/create-post"}>{"Create a new post"}</Link>
        </span>
      </div>
      <h1 className="font-bold text-center text-xl">{"Your posts"}</h1>
      <div className="border flex flex-wrap gap-5 justify-center ml-1 mr-1">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>{error}</p>}
        <div className="flex flex-col gap-5 h-fit min-w-fit">
          {posts.map((post: Post, index: number) => (
            <div className="h-fit min-w-fit" key={index}>
              <Link href={"post/" + post._id}>
                <PostCard post={post} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PostsPage;
