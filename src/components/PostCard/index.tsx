import Post from "@/types/Post";

const PostCard = (props: { post: Post | undefined }) => {
  return (
    <div className="border border-gray-400 flex flex-col min-h-min">
      <div className="border-b border-gray-300 font-semibold p-2 text-center">
        {props.post?.title}
      </div>
      <div className="p-2 text-start h-2/3 overflow-hidden text-ellipsis">
        {props.post?.content}
      </div>
    </div>
  );
};

export default PostCard;
