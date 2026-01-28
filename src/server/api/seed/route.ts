import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { auth } from "~/server/auth";

export async function GET() {
  const session = await auth();

  if (
    !session ||
    (session.user?.role !== "ADMIN" && session.user?.role !== "CREATOR")
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    console.log("Starting seeding process...");

    const postsData = Array.from({ length: 50 }).map((_, i) => ({
      title: `Experimental Post #${i + 1}`,
      content: `Testing loading performance for a large grid. This is sample content for testing purposes. Post index: ${i}`,

      image: `https://picsum.photos/seed/proof${i}/800/800`,
      status: "PUBLISHED",
      createdById: userId,
    }));

    for (const post of postsData) {
      await db.post.create({
        data: post,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded 50 posts for user: ${session.user.name}`,
    });
  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 },
    );
  }
}
