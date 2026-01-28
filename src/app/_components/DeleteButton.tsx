"use client";

import { deletePost } from "~/app/actions/posts";

export default function DeleteButton({ postId }: { postId: number }) {
  return (
    <button 
      onClick={async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
          await deletePost(postId);
        }
      }}
      className="text-red-300 hover:text-red-500 font-bold text-[11px] transition-all"
    >
      Delete
    </button>
  );
}