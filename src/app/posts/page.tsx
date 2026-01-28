import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";


const mockPosts = [
  {
    id: 1,
    title: "How to use Proof Admin",
    author: "Rania",
    date: "2024-03-20",
    status: "Published",
  },
  {
    id: 2,
    title: "UI/UX Trends in 2024",
    author: "Ahmed",
    date: "2024-03-18",
    status: "Draft",
  },
];

export default async function AllPostsPage() {
  const session = await auth();

  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-12 font-sans">
      <div className="mx-auto max-w-6xl">
        {}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              All Posts
            </h1>
            <p className="mt-2 font-medium text-slate-500">
              Manage and review all system content
            </p>
          </div>
          <Link
            href="/posts/create"
            className="rounded-2xl bg-black px-8 py-4 font-bold text-white shadow-xl shadow-black/5 transition-all hover:bg-gray-800 active:scale-95"
          >
            + Create New Post
          </Link>
        </div>

        {}
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-100 bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Title
                </th>
                <th className="px-8 py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Author
                </th>
                <th className="px-8 py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Date
                </th>
                <th className="px-8 py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Status
                </th>
                <th className="px-8 py-5 text-right text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockPosts.map((post) => (
                <tr
                  key={post.id}
                  className="group transition-colors hover:bg-slate-50/30"
                >
                  <td className="px-8 py-6 font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                    {post.title}
                  </td>
                  <td className="px-8 py-6 font-medium text-slate-600">
                    {post.author}
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-400">
                    {post.date}
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`rounded-full px-4 py-1.5 text-[10px] font-black tracking-wider uppercase ${
                        post.status === "Published"
                          ? "border border-green-200 bg-green-100/50 text-green-700"
                          : "border border-amber-200 bg-amber-100/50 text-amber-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="space-x-4 px-8 py-6 text-right">
                    <button className="text-sm font-bold text-slate-400 transition-all hover:text-black">
                      Edit
                    </button>
                    <button className="text-sm font-bold text-red-300 transition-all hover:text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {}
          {mockPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-medium text-slate-400">
                No posts found. Start by creating one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
