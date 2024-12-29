import Link from "next/link";

const Home = () => (
  <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Baby Document Management</h1>
    <p>Organize your baby's medical, vaccine, and other documents in one place.</p>
    <Link href="/upload">
      <a className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        Get Started
      </a>
    </Link>
  </div>
);

export default Home;