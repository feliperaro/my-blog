import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 p-24">
      <h1 className="font-bold text-xl">{"Blog Post - Felipe Roque"}</h1>
      <div className="flex flex-col gap-1 text-start">
        <h2 className="hover:font-bold hover:text-gray-800">
          <Link href={"/create-post"}>{"New post"}</Link>
        </h2>
        <h2 className="hover:font-bold hover:text-gray-800">
          <Link href={"/posts"}>{"Your posts"}</Link>
        </h2>
      </div>
    </main>
  );
}
