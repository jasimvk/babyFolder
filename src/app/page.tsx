"use client";
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
    <h1 className="text-4xl font-bold mb-6 text-center">Baby Document Management</h1>
    <p className="text-xl mb-6 text-center">
      Organize your baby's medical, vaccine, and other documents in one place.
    </p>
    <div className="mt-8 w-full max-w-2xl">
      <FileUpload />
    </div>
  </div>
);

export default Home;