"use client";

import { useState } from "react";
import { updatePost } from "../actions/posts";

interface PostType {
  id: number;
  title: string;
  content: string;
  image: string | null;
  status: string;
}

interface EditPostProps {
  post: PostType;
}

export default function EditPostModal({ post }: EditPostProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] font-bold text-slate-400 transition-all hover:text-black"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in relative w-full max-w-lg rounded-[2.5rem] bg-white p-8 text-left shadow-2xl duration-200">
            <div className="mb-6 flex items-center justify-between text-left">
              <h2 className="text-xl font-black text-slate-900">Edit Post</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form
              action={async (formData) => {
                const postId = Number(post.id);
                await updatePost(postId, formData);
                setIsOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Title
                </label>
                <input
                  name="title"
                  defaultValue={post.title}
                  required
                  className="w-full rounded-2xl border-none bg-slate-50 p-4 font-bold outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Image URL
                </label>
                <input
                  name="image"
                  defaultValue={post.image ?? ""}
                  className="w-full rounded-2xl border-none bg-slate-50 p-4 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Content
                </label>
                <textarea
                  name="content"
                  defaultValue={post.content}
                  required
                  rows={4}
                  className="w-full rounded-2xl border-none bg-slate-50 p-4 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={post.status}
                  className="w-full rounded-2xl border-none bg-slate-50 p-4 font-bold outline-none"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-2xl bg-blue-600 py-4 font-black text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700"
              >
                Update Post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
