import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import AdminView from "./_components/AdminView";
import CreatorView from "./_components/CreatorView";
import UserView from "./_components/UserView";

interface SafePost {
  id: number;
  title: string;
  content: string;
  image: string | null;
  status: string;
  createdAt: Date;
}

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/login");

  const userRole = session.user?.role;
  const userId = session.user?.id;

  const posts = await db.post.findMany({
    where: userRole === "CREATOR" ? { createdById: userId } : {},
    orderBy: { createdAt: "desc" },
  });

  const safePosts: SafePost[] = posts.map((p) => ({
    id: p.id,
    title: String(p.title ?? ""),
    content: String(p.content ?? ""),
    image: p.image ? String(p.image) : null,
    status: String(p.status ?? "PUBLISHED"),
    createdAt: p.createdAt,
  }));

  const safeSession = {
    user: {
      id: String(session.user?.id),
      name: session.user?.name ?? "User",
      email: session.user?.email ?? "",
      role: session.user?.role ?? "USER",
    },
  };

  if (userRole === "ADMIN")
    return <AdminView initialPosts={safePosts} session={safeSession} />;
  if (userRole === "CREATOR")
    return <CreatorView initialPosts={safePosts} session={safeSession} />;

  return <UserView initialPosts={safePosts} session={safeSession} />;
}
