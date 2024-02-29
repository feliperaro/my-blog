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
  const [post, setPost] = useState<Post>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:3000/api/posts/" + params.id
        );
        const post = await response.json();
        setPost(post);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const deletePost = async () => {
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

  const editPost = async (post: Post) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit post");
      }

      const data = await response.json();
      setPost(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setShowEditModal(false);
    }
  };

  const handleClickDeletePost = () => {
    const answer = confirm("Are you sure you want to delete this post?");
    if (!answer) return;
    deletePost();
  };

  const handleClickEditPost = (post: Post) => {
    if (validateInputs(post.title, post.content)) editPost(post);
    else alert("Please validate your inputs");
  };

  const validateInputs = (title: string, content: string): boolean => {
    if (!title || title.trim().length === 0) {
      return false;
    }

    if (!content || content.trim().length === 0) {
      return false;
    }

    return true;
  };

  return (
    <main className="flex min-h-screen flex-col gap-5 p-12">
      <span className="font-medium hover:font-extrabold">
        <Link href={"/posts"}>Back</Link>
      </span>
      {error && <p>{error}</p>}
      {post && !showEditModal ? (
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="flex flex-col gap-5 h-fit w-fit">
            <PostCard post={post} />
          </div>
          <div className="flex flex-col justify-between">
            <span
              className="hover:font-extrabold"
              onClick={() => setShowEditModal(true)}
            >
              Edit Post
            </span>
            <span
              className="hover:font-extrabold hover:text-red-500"
              onClick={handleClickDeletePost}
            >
              Delete Post
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-fit w-full">
          {post && (
            <EditPostModal
              post={post}
              onClickCancel={() => setShowEditModal(false)}
              onClickEdit={(post) => handleClickEditPost(post)}
            />
          )}
        </div>
      )}
    </main>
  );
}
