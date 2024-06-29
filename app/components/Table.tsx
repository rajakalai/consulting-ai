interface Call {
    id: string;
    name: string;
    title: string;
    type: 'video' | 'audio';
    uploadedTime: string;
  }
  
  interface TableProps {
    calls: Call[];
  }
  
  export default function Table({ calls }: TableProps) {
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-center">Type</th>
            <th className="py-3 px-6 text-center">Uploaded Time</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {calls.map((call) => (
            <tr key={call.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{call.name}</td>
              <td className="py-3 px-6 text-left">{call.title}</td>
              <td className="py-3 px-6 text-center">{call.type}</td>
              <td className="py-3 px-6 text-center">{call.uploadedTime}</td>
              <td className="py-3 px-6 text-center">
                <button className="bg-blue-500 text-white py-1 px-2 rounded-full text-xs">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }