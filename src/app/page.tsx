import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24">
      <h1 className="font-extrabold text-2xl text-center">BLOG</h1>
      <div className="flex flex-col gap-1 text-start">
        <h2 className="hover:text-gray-500">
          <Link href={"/create-post"}>Create</Link>
        </h2>
        <h2 className="hover:text-gray-500">
          <Link href={"/posts"}>Posts</Link>
        </h2>
      </div>
    </main>
  );
}
