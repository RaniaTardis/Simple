"use server";

import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const session = await auth();

  const isAuthorized =
    session?.user?.role === "ADMIN" || session?.user?.role === "CREATOR";

  if (!session?.user?.id || !isAuthorized) {
    throw new Error("Unauthorized: Only Admins and Creators can create posts.");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const status = formData.get("status") as string;

  await db.post.create({
    data: {
      title,
      content,
      image,
      status: status || "PUBLISHED",
      createdById: session.user.id,
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function deletePost(postId: number) {
  const session = await auth();

  const isAuthorized =
    session?.user?.role === "ADMIN" || session?.user?.role === "CREATOR";

  if (!session?.user?.id || !isAuthorized) {
    throw new Error("Unauthorized");
  }

  try {
    await db.post.delete({
      where: { id: postId },
    });
    revalidatePath("/");
    return { success: true };
  }
   catch (error) {
    console.error("Delete error:", error);
    return { success: false };
  }
}

export async function updatePost(postId: number, formData: FormData) {
  const session = await auth();
  const isAuthorized =
    session?.user?.role === "ADMIN" || session?.user?.role === "CREATOR";

  if (!session?.user?.id || !isAuthorized) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const status = formData.get("status") as string;

  await db.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      image: image || null,
      status: status || "PUBLISHED",
    },
  });

  revalidatePath("/");
}
