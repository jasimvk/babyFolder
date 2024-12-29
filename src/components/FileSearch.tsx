"use client";

import React from 'react';

interface Document {
  name: string;
  publicUrl: string;
}

interface FileSearchProps {
  documents: Document[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FileSearch: React.FC<FileSearchProps> = ({ documents, searchQuery, setSearchQuery }) => {
  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <div key={doc.name} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                <span>{doc.name}</span>
                <a
                  href={doc.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700 transition duration-300"
                >
                  View/Download
                </a>
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