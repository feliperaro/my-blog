const BlogPost = () => {
  return (
    <main className="border border-black flex min-h-screen flex-col justify-between p-12">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-center">{"Create your blog post :D"}</h1>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="title">
            {"Title:"}
          </label>
          <input type="text" name="title" id="title" className="p-2" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="content">
            {"Content:"}
          </label>
          <textarea
            className="p-2"
            name="content"
            id="content"
            placeholder="Write your content here..."
            required
            rows={10}
          />
        </div>
        <div className="">
          <button className="hover:text-gray-500" type="button">
            {"POST"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;
