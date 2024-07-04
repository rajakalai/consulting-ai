// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Call } from '../types/calls';

// const CallsPage = () => {
//   const [calls, setCalls] = useState<Call[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     fetch('/api/calls', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({}),
//     })
//       .then(response => response.json())
//       .then(data => setCalls(data.calls || []));
//   }, []);

//   const handleRowClick = (call_id: string) => {
//     router.push(`/calls/${call_id}`);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-[calc(100vh-140px)] flex flex-col">
//       <h1 className="text-3xl font-bold mb-6 text-left text-purple-600">Calls</h1>
//       <div className="flex-grow overflow-hidden bg-white shadow-md rounded-lg flex flex-col">
//         <div className="overflow-x-auto">
//           <table className="min-w-full leading-normal">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Call ID
//                 </th>
//                 <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Project ID
//                 </th>
//                 <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Interviewee Name
//                 </th>
//                 <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Interviewee Role
//                 </th>
//                 <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Created At
//                 </th>
//                 <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Updated At
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {calls.length > 0 ? (
//                 calls.map(call => (
//                   <tr key={call.call_id} onClick={() => handleRowClick(call.call_id)} className="cursor-pointer hover:bg-gray-50">
//                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{call.call_id}</p>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{call.project_id}</p>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{call.interviewee_name}</p>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{call.interviewee_role}</p>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{new Date(call.created_at).toLocaleString()}</p>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{new Date(call.updated_at).toLocaleString()}</p>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm text-center" colSpan={6}>Loading...</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallsPage;

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Call } from '../types/calls';

const CallsPage = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Sending an empty object in the body
    })
      .then(response => response.json())
      .then(data => {
        setCalls(data.calls || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching calls:', error);
        setIsLoading(false);
      });
  }, []);

  const handleRowClick = (call_id: string) => {
    router.push(`/calls/${call_id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-bounce text-6xl mb-4">📞</div>
          <div className="inline-block animate-pulse text-6xl mb-4 ml-4">💬</div>
          <p className="mt-4 text-xl font-semibold text-purple-600">Fetching awesome calls...</p>
          <p className="mt-2 text-gray-600">Don't hang up, we're almost there! 😉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-[calc(100vh-140px)] text-black w-screen">
      <div className="p-4 w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">Call Details</h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Call Id
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Project Id
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Interviewee Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Interviewee Role
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {calls.map(call => (
                <tr key={call.call_id} onClick={() => handleRowClick(call.call_id)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{call.call_id}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{call.project_id}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{call.interviewee_name}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{call.interviewee_role}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(call.created_at).toLocaleString()}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(call.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CallsPage;