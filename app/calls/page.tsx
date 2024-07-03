'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Call } from '../types/calls';

const CallsPage = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => setCalls(data.calls || []));
  }, []);

  const handleRowClick = (call_id: string) => {
    router.push(`/calls/${call_id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-140px)] flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-left text-purple-600">Calls</h1>
      <div className="flex-grow overflow-hidden bg-white shadow-md rounded-lg flex flex-col">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Call ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Project ID
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
            <tbody className="bg-white">
              {calls.length > 0 ? (
                calls.map(call => (
                  <tr key={call.call_id} onClick={() => handleRowClick(call.call_id)} className="cursor-pointer hover:bg-gray-50">
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{call.call_id}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{call.project_id}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{call.interviewee_name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{call.interviewee_role}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{new Date(call.created_at).toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{new Date(call.updated_at).toLocaleString()}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-center" colSpan={6}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CallsPage;
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
//       body: JSON.stringify({}), // Sending an empty object in the body
//     })
//       .then(response => response.json())
//       .then(data => setCalls(data.calls || [])); // Ensure `calls` is an array
//   }, []);

//   const handleRowClick = (call_id: string) => {
//     router.push(`/calls/${call_id}`);
//   };

//   return (
//     <div className="flex justify-center  h-[calc(100vh-140px)] text-black w-screen">
//       <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">Call Details</h1>
//       <div className="flex-grow overflow-hidden bg-white shadow-md rounded-lg flex flex-col">
//         <table className="min-w-full leading-normal">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Call Id
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Project Id
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Interviewee Name
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Interviewee Role
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Created At
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Updated At
//               </th>
//             </tr>
//           </thead>
//             <tbody>
//               {calls.length > 0 ? (
//                 calls.map(call => (
//                   <tr key={call.call_id} onClick={() => handleRowClick(call.call_id)} className="cursor-pointer hover:bg-gray-50">
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{call.call_id}</td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{call.project_id}</td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{call.interviewee_name}</td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{call.interviewee_role}</td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(call.created_at).toLocaleString()}</td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(call.updated_at).toLocaleString()}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="py-3 px-6 border-b border-gray-200 text-center" colSpan={6}>Loading...</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

//export default CallsPage;


// <div className="container mx-auto px-4 py-8 h-[calc(100vh-140px)] flex flex-col">
// <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">Employee Directory</h1>
// <div className="flex-grow overflow-hidden bg-white shadow-md rounded-lg flex flex-col">
//   <table className="min-w-full leading-normal">
//     <thead className="bg-gray-100">
//       <tr>
//         <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//           Name
//         </th>
//         <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//           Role
//         </th>
//         <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//           Department
//         </th>
//         <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//           Status
//         </th>
//       </tr>
//     </thead>
//   </table>
//   <div className="flex-grow overflow-y-auto">
//     <table className="min-w-full leading-normal">
//       <tbody className="bg-white">
//         {tableData.map((employee) => (
//           <tr key={employee.id}>
//             <td className="px-5 py-5 border-b border-gray-200 text-sm">
//               <div className="flex items-center">
//                 <div className="ml-3">
//                   <p className="text-gray-900 whitespace-no-wrap">{employee.name}</p>
//                 </div>
//               </div>
//             </td>
//             <td className="px-5 py-5 border-b border-gray-200 text-sm">
//               <p className="text-gray-900 whitespace-no-wrap">{employee.role}</p>
//             </td>
//             <td className="px-5 py-5 border-b border-gray-200 text-sm">
//               <p className="text-gray-900 whitespace-no-wrap">{employee.department}</p>
//             </td>
//             <td className="px-5 py-5 border-b border-gray-200 text-sm">
//               <span className={`relative inline-block px-3 py-1 font-semibold ${employee.status === 'Active' ? 'text-green-900' : 'text-red-900'} leading-tight`}>
//                 <span aria-hidden className={`absolute inset-0 ${employee.status === 'Active' ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
//                 <span className="relative">{employee.status}</span>
//               </span>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
// </div>