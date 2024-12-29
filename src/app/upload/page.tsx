"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import FileSearch from '../../components/FileSearch';

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus('Please select a file to upload.');
      return;
    }
    
    const fileName = `${Date.now()}_${file.name}`;
    console.log('Uploading file:', fileName);
    try {
      const { data, error } = await supabase.storage
        .from('babyFolder')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        setStatus(`Upload failed: ${error.message}`);
      } else {
        console.log('Upload data:', data);
        setStatus('Upload successful!');
        fetchDocuments(); // Fetch documents after successful upload
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setStatus('Unexpected error occurred during upload.');
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('babyFolder')
        .list();

      if (error) {
        console.error('Fetch documents error:', error);
      } else {
        // Attach public URLs to documents
        const updatedDocuments = await Promise.all(
          data.map(async (doc) => {
            const { data: fileUrl } = supabase.storage
              .from("babyFolder")
              .getPublicUrl(doc.name);
            return { ...doc, publicUrl: fileUrl.publicUrl };
          })
        );
        setDocuments(updatedDocuments);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="mt-2 mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={uploadFile}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload
      </button>
      <p className="mt-2 text-green-500">{status}</p>

      <FileSearch 
        documents={documents} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
    </div>
  );
};

export default FileUpload;