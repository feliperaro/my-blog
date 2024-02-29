import Post from "@/types/Post";
import TagsInput from "../TagsInput";
import { useState } from "react";

type ModalProps = {
  post: Post;
  onClickCancel: () => void;
  onClickEdit: (post: Post) => void;
};

const EditPostModal = (props: ModalProps) => {
  const { post } = props;
  const [postContent, setPostContent] = useState<Post>(post);

  const handleContentChange = (content: string) => {
    setPostContent({ ...postContent, content });
  };

  const handleTagChange = (newTags: string[]) => {
    setPostContent({ ...postContent, tags: newTags });
  };

  const handleTitleChange = (title: string) => {
    setPostContent({ ...postContent, title });
  };
  return (
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
          value={postContent.title}
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
          value={postContent.content}
        />
      </div>
      <div className="">
        <TagsInput initialTags={postContent.tags} onChange={handleTagChange} />
      </div>
      <div className="flex gap-2 justify-center">
        <button
          className="border border-gray-700 pb-1 pl-6 pr-6 pt-1 rounded hover:font-extrabold hover:border-gray-900"
          onClick={() => props.onClickEdit(postContent)}
          type="button"
        >
          {"Edit post"}
        </button>
        <button
          className="border border-gray-700 pb-1 pl-6 pr-6 pt-1 rounded hover:font-extrabold hover:border-gray-900"
          onClick={props.onClickCancel}
          type="button"
        >
          {"Cancel"}
        </button>
      </div>
    </div>
  );
};

export default EditPostModal;
