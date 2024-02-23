import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-center">BLOG</h1>
        <h2 className="hover:text-gray-500">
          <Link href={"/blog-post"}>Create a blog post</Link>
        </h2>
      </div>
    </main>
  );
}
