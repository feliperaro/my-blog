import Post from "@/types/Post";

const EditPostModal = (props: { post: Post | undefined }) => {
  const { post } = props;
  return <div className="">EDIT POST {post?.title} MODAL</div>;
};

export default EditPostModal;
