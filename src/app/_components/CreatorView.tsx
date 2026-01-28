import Link from "next/link";
import NextImage from "next/image";
import CreatePostModal from "./CreatePostModal";
import EditPostModal from "./EditPostModal";
import DeleteButton from "./DeleteButton";

interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  status: string;
  createdAt: Date;
}

interface CreatorViewProps {
  initialPosts: Post[];
  session: {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string;
    };
  };
}

export default function CreatorView({
  initialPosts,
  session,
}: CreatorViewProps) {
  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      <aside className="sticky top-0 flex h-screen w-64 flex-col bg-zinc-900 p-6 text-white">
        <div className="mb-10 flex items-center gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
          <span className="text-xl font-black tracking-tighter uppercase">
            Creator Studio
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="mb-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Main Menu
          </div>
          <div className="flex cursor-default items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
            My Content
          </div>
        </nav>

        <div className="mt-auto rounded-2xl border border-white/5 bg-zinc-800/50 p-4">
          <p className="mb-1 text-[10px] font-bold text-zinc-400">
            Logged in as
          </p>
          <p className="truncate text-xs font-bold">{session.user?.name}</p>
          <Link
            href="/api/auth/signout"
            className="mt-3 block text-[10px] font-black text-red-400 uppercase hover:text-red-300"
          >
            Sign Out →
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-12">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Your Posts</h1>
            <p className="mt-1 text-sm font-medium text-zinc-400">
              You have managed {initialPosts.length} pieces of content
            </p>
          </div>
          <CreatePostModal />
        </header>

        {initialPosts.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-zinc-100 text-zinc-300">
            <p className="font-bold italic">No posts yet. Start creating!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {initialPosts.map((post) => (
              <div
                key={post.id}
                className="group flex items-center gap-6 rounded-[2.5rem] border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-zinc-200/50"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50">
                  {post.image && (
                    <NextImage
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="mb-4 truncate text-xl font-bold text-zinc-800">
                    {post.title}
                  </h3>
                  <div className="flex gap-3">
                    <EditPostModal post={post} />
                    <DeleteButton postId={post.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
