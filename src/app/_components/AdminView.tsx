import Link from "next/link";
import NextImage from "next/image";
import CreatePostModal from "./CreatePostModal";
import EditPostModal from "./EditPostModal";
import DeleteButton from "./DeleteButton";
import { seedPostsAction } from "../actions/seed";

interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  status: string;
  createdAt: Date;
}

interface AdminViewProps {
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

export default function AdminView({ initialPosts, session }: AdminViewProps) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <aside className="sticky top-0 flex h-screen w-60 flex-col bg-black p-6 text-white shadow-2xl">
        <div className="mb-10 text-xl font-black tracking-tighter text-amber-500 italic">
          PROOF ADMIN
        </div>

        <nav className="flex-1">
          <div className="mb-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            System Control
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-900 px-4 py-3 text-sm font-bold">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            Overview
          </div>
        </nav>

        <Link
          href="/api/auth/signout"
          className="rounded-xl p-4 text-sm font-bold text-red-400 transition-all hover:bg-red-500/10"
        >
          Logout System
        </Link>
      </aside>

      <main className="flex-1 p-8 md:p-12">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-zinc-900 uppercase italic">
                Dashboard
              </h1>
              <p className="mt-1 text-[10px] font-bold tracking-widest text-gray-400">
                CONTROLLING {initialPosts.length} SYSTEM ENTRIES
              </p>
            </div>

            <div className="flex items-center gap-4">
              <form
                action={async () => {
                  "use server";
                  await seedPostsAction();
                }}
              >
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-5 py-2.5 text-[10px] font-bold text-white uppercase shadow-lg shadow-amber-200/20 transition-all hover:bg-amber-600 active:scale-95"
                >
                  ⚡ Seed 50
                </button>
              </form>
              <CreatePostModal />
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            {initialPosts.map((post) => (
              <div
                key={post.id}
                className="group flex gap-6 rounded-[2.5rem] border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                  {post.image && (
                    <NextImage
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="mb-1 truncate text-lg font-black text-gray-800">
                    {post.title}
                  </h3>
                  <div className="mt-4 flex gap-3">
                    {}
                    <EditPostModal post={post} />
                    <DeleteButton postId={post.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
