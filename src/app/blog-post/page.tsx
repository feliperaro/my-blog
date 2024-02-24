"use client";

import TagsInput, { Tag } from "@/components/TagsInput";
import Link from "next/link";
import { useState } from "react";

type Post = {
  title: string;
  content: string;
  dateCreated?: Date;
  category?: string;
  tags: Tag[];
};

const initialState: Post = {
  title: "",
  content: "",
  tags: [],
};

const BlogPost = () => {
  const [post, setPost] = useState<Post>(initialState);

  const handleTitleChange = (title: string) => {
    setPost({ ...post, title });
  };

  const handleContentChange = (content: string) => {
    setPost({ ...post, content });
  };

  const handleTagChange = (newTags: Tag[]) => {
    setPost({ ...post, tags: newTags });
  };

  const handlePost = () => {
    alert("Post" + JSON.stringify(post));
    setPost(initialState);
  };

  return (
    <main className="border border-black flex min-h-screen flex-col justify-between p-12">
      <span className="font-medium hover:font-extrabold">
        <Link href={"/"}>Go Back</Link>
      </span>
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-center">{"Create your blog post :D"}</h1>
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
        <div className="">
          <TagsInput
            initialTags={post.tags}
            onChange={(tags) => handleTagChange(tags)}
          />
        </div>
        <div className="h-fit w-fit">{JSON.stringify(post)}</div>
        <div className="flex justify-center">
          <button
            className="
            border border-gray-700 pb-1 pl-6 pr-6 pt-1 rounded
            hover:font-bold"
            onClick={handlePost}
            type="button"
          >
            {"Create blog post"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;
