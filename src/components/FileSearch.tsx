"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

interface Document {
  name: string;
  signedUrl: string;
}

const FileSearch = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      // Fetch the list of files in the private bucket
      const { data: files, error } = await supabase.storage
        .from("babyFolder") // Replace "babyFolder" with your actual bucket name
        .list();

      if (error) {
        console.error("Error fetching files:", error.message);
        alert("Error: " + error.message);
        return;
      }

      if (files) {
        // Generate signed URLs for each file
        const docs = await Promise.all(
          files.map(async (file) => {
            const { data: signedUrlData, error: signedUrlError } =
              await supabase.storage
                .from("babyFolder") // Replace "babyFolder" with your bucket name
                .createSignedUrl(file.name, 60 * 60); // 60 minutes expiry

            if (signedUrlError) {
              console.error(
                `Error generating signed URL for ${file.name}:`,
                signedUrlError.message
              );
              return null;
            }

            return {
              name: file.name,
              signedUrl: signedUrlData.signedUrl,
            };
          })
        );

        setDocuments(docs.filter((doc) => doc !== null));
      }
    };

    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center mt-6 w-full">
      <input
        type="text"
        placeholder="Search documents"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
      <div className="mt-4 w-full">
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.name}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>{doc.name}</span>
                <button
                  onClick={() => handleLinkClick(doc.signedUrl)}
                  className="text-blue-500 underline hover:text-blue-700 transition duration-300"
                >
                  View/Download
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No documents found</p>
        )}
      </div>
    </div>
  );
};

export default FileSearch;