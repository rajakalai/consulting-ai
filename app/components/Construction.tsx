import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <Image
          src="/construction.svg"
          alt="Under Construction"
          width={300}
          height={200}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Site Under Construction
        </h1>
        <p className="text-gray-600 mb-6">
          We're working hard to improve our website. Please check back soon for updates!
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-yellow-400 h-2.5 rounded-full w-2/3"></div>
        </div>
        <p className="text-sm text-gray-500">Progress: 66%</p>
      </div>
    </div>
  );
}