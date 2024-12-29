import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const FileList = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.storage.from("babyFolder").list("docs");

      if (data) {
        setFiles(data);
      }
      setLoading(false);
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Uploaded Documents</h2>
      {loading ? (
        <p>Loading...</p>
      ) : files.length ? (
        <ul>
          {files.map((file) => (
            <li key={file.name} className="mb-2">
              {file.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default FileList;