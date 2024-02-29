"use client";

import { useState } from "react";
import Link from "next/link";
import Post from "@/types/Post";
import TagsInput from "@/components/TagsInput";
import axios from "../../config/axios";
import { useRouter } from "next/navigation";

const initialState: Post = {
  title: "",
  content: "",
  tags: [],
};

const CreatePostPage = () => {
  const router = useRouter();
  const [post, setPost] = useState<Post>(initialState);

  const handleContentChange = (content: string) => {
    setPost({ ...post, content });
  };

  const handleTagChange = (newTags: string[]) => {
    setPost({ ...post, tags: newTags });
  };

  const handleTitleChange = (title: string) => {
    setPost({ ...post, title });
  };

  const handlePost = async () => {
    if (!post.title || !post.content) {
      return alert("Please fill in all required fields.");
    }

    try {
      const response = await axios.post("/posts", post);
      const msgSuccess = "Post submitted successfully";
      console.log(msgSuccess, response.data);
      alert(msgSuccess);
      router.push("/posts");
    } catch (error: any) {
      const msgError: string = "Error submitting post";
      console.error(msgError, error);
      alert(msgError);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-5 justify-between p-4">
      <div className="flex flex-col">
        <span className="font-medium hover:font-extrabold">
          <Link href={"/"}>{"Home"}</Link>
        </span>
        <span className="font-medium hover:font-extrabold">
          <Link href={"/posts"}>{"Your posts"}</Link>
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="title">
            {"Title:"}
          </label>
          <input
            className="p-2"
            id="title"
            name="title"
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            type="text"
            value={post.title}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="content">
            {"Content:"}
          </label>
          <textarea
            className="p-2"
            id="content"
            name="content"
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Write your content here..."
            required
            rows={10}
            value={post.content}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="content">
            {"Tags:"}
          </label>
          <TagsInput
            initialTags={post.tags}
            onChange={(tags) => handleTagChange(tags)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="border border-gray-700 pb-1 pl-6 pr-6 pt-1 rounded hover:font-extrabold hover:border-gray-900"
            onClick={handlePost}
            type="button"
          >
            {"Create post"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreatePostPage;
