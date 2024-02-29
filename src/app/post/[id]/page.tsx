"use client";

import EditPostModal from "@/components/EditPostModal";
import PostCard from "@/components/PostCard";
import Post from "@/types/Post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [post, setPosts] = useState<Post>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:3000/api/posts/" + params.id
        );
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [params.id]);

  const handleDelete = async () => {
    const answer = confirm("Are you sure you want to delete this post?");
    if (!answer) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${params.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      const data = await response.json();
      console.log(data.message);
      alert(data.message);

      router.push("/posts");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleEdit = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <main className="flex min-h-screen flex-col gap-5 p-12">
      <span className="font-medium hover:font-extrabold">
        <Link href={"/posts"}>Back</Link>
      </span>
      <div className="flex flex-col gap-5 items-center justify-center">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>{error}</p>}
        <div className="flex flex-col gap-5 h-fit w-fit">
          <PostCard post={post} />
        </div>
        <div className="flex flex-col justify-between">
          <span className="hover:font-extrabold" onClick={handleEdit}>
            Edit Post
          </span>
          <span
            className="hover:font-extrabold hover:text-red-500"
            onClick={handleDelete}
          >
            Delete Post
          </span>
        </div>
        {showEditModal && <EditPostModal post={post} />}
      </div>
    </main>
  );
}
