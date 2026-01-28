"use client";

import { useState } from "react";
import { createPost } from "../actions/posts";

export default function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:bg-gray-800"
      >
        <span>+</span> Create New Post
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in relative w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl duration-200">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black">Create New Post</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form
              action={async (formData) => {
                await createPost(formData);
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
                  required
                  className="w-full rounded-2xl bg-slate-50 p-4 font-bold outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Image URL
                </label>
                <input
                  name="image"
                  placeholder="https://..."
                  className="w-full rounded-2xl bg-slate-50 p-4 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Content
                </label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  className="w-full rounded-2xl bg-slate-50 p-4 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full rounded-2xl bg-slate-50 p-4 font-bold outline-none"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-2xl bg-black py-4 font-black text-white transition-all hover:bg-gray-800"
              >
                Save Post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
