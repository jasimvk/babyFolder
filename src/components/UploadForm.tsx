import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }
    setUploading(true);
    setError(null);

    try {
      const { data, error } = await supabase.storage
        .from("babyFolder")
        .upload(`docs/${file.name}`, file);

      if (error) throw error;

      alert("File uploaded successfully!");
    } catch (err) {
      setError("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md max-w-lg mx-auto bg-white">
      <h2 className="text-lg font-bold mb-4">Upload Baby Document</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className={`px-4 py-2 text-white rounded ${
          uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default UploadForm;