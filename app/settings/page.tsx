// import Construction from '../components/Construction'

// export default Construction;

// 'use client';
// import { useState, useEffect } from 'react';

// export default function Home() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         const newProgress = oldProgress + 1;
//         return newProgress > 100 ? 0 : newProgress;
//       });
//     }, 100);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-300 flex flex-col items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
//         <div className="w-64 h-64 mx-auto mb-6 relative">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
//             <circle cx="50" cy="50" r="45" fill="#FFD700" />
//             <circle cx="35" cy="40" r="5" fill="#000" />
//             <circle cx="65" cy="40" r="5" fill="#000" />
//             <path d="M35 70 Q50 80 65 70" fill="none" stroke="#000" strokeWidth="3" />
//             <path d="M20 20 L80 20 L50 5 Z" fill="#FF6347" />
//             <rect x="45" y="20" width="10" height="5" fill="#A52A2A" />
//           </svg>
//           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//             <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
//           </div>
//         </div>
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Oops! We're Still Building!
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Our digital construction crew is working overtime. Check back soon for something awesome!
//         </p>
//         <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//           <div 
//             className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//         <p className="text-sm text-gray-500">Progress: {progress}%</p>
//       </div>
//     </div>
//   );
// }

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