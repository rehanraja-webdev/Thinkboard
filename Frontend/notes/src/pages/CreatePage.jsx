import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/notes", {
        title,
        content,
      });

      navigate("/");
      toast.success("Note created successfully!");
    } catch (error) {
      if (error?.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center py-16 px-4">
      <div className="w-full max-w-3xl">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base-content/80 hover:text-base-content mb-8"
        >
          <ArrowLeftIcon size={18} />
          <span className="font-medium">Back to Notes</span>
        </Link>

        {/* Card */}
        <div className="bg-base-200 border border-base-content/10 rounded-3xl p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-10">Create New Note</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-3">Title</label>

              <input
                type="text"
                placeholder="Note Title"
                className="input input-bordered w-full rounded-2xl h-14 text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Content
              </label>

              <textarea
                placeholder="Write your note here..."
                className="textarea textarea-bordered w-full h-40 rounded-2xl text-base resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-success rounded-full px-8 min-w-37.5"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </>
                ) : (
                  "Create Note"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
