"use client";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import PostSkeleton from "./PostSkeleton";

interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  status: string;
  createdAt: Date;
}

interface UserViewProps {
  initialPosts: Post[];
  session: {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  };
}

export default function UserView({ initialPosts, session }: UserViewProps) {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(
    initialPosts.slice(0, 6),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentPosition = window.innerHeight + window.scrollY;

      if (currentPosition >= scrollHeight - 100 && !loading) {
        if (displayedPosts.length < initialPosts.length) {
          setLoading(true);

          setTimeout(() => {
            const nextBatch = initialPosts.slice(0, displayedPosts.length + 6);
            setDisplayedPosts(nextBatch);
            setLoading(false);
          }, 1500);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, displayedPosts.length, initialPosts]);

  return (
    <div className="min-h-screen bg-white p-8 md:p-16">
      <header className="mx-auto mb-16 flex max-w-7xl items-center justify-between">
        <h1 className="text-3xl font-medium text-gray-800">
          Welcome,{" "}
          <span className="text-gray-500">
            {session.user?.name?.toLowerCase()}
          </span>
        </h1>
        <Link
          href="/api/auth/signout"
          className="text-xs font-bold text-gray-400 transition-colors hover:text-red-500"
        >
          Sign Out
        </Link>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {}
        {displayedPosts.map((post) => (
          <div
            key={post.id}
            className="animate-in fade-in flex flex-col gap-4 duration-700"
          >
            <div className="group relative aspect-square w-full overflow-hidden rounded-[2.5rem] bg-[#f0f0f0]">
              {post.image && (
                <NextImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
            </div>
            <div className="px-4">
              <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">
                {post.content}
              </p>
            </div>
          </div>
        ))}

        {}
        {loading && (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}
      </div>

      {}
      {!loading &&
        displayedPosts.length >= initialPosts.length &&
        initialPosts.length > 0 && (
          <p className="mt-20 text-center text-sm text-gray-300 italic">
            You&apos;ve reached the end of the feed.
          </p>
        )}
    </div>
  );
}
