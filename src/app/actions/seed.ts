"use server";

import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { revalidatePath } from "next/cache";

export async function seedPostsAction() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("cant do it");
  }

  const userId = session.user.id;

  const postsData = Array.from({ length: 50 }).map((_, i) => ({
    title: `Experimental Post #${i + 1}`,
    content: `Testing grid layout and loading states with 50 unique items. Created at: ${new Date().toLocaleTimeString()}`,
    image: `https://picsum.photos/seed/${Math.random()}/800/800`,
    status: "PUBLISHED",
    createdById: userId,
  }));

  await db.post.createMany({ data: postsData });

  revalidatePath("/");
  return { success: true };
}
