import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Email & PDF Ingestion</h1>
      <Link href="/email-config">
        <button>Go to Email Configuration</button>
      </Link>
    </div>
  );
}