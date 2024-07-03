import Link from 'next/link';

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
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {calls.map((call) => (
          <tr key={call.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <Link href={`/calls/${call.id}`} className="hover:text-purple-600">
                {call.name}
              </Link>
            </td>
            <td className="py-3 px-6 text-left">{call.title}</td>
            <td className="py-3 px-6 text-center">{call.type}</td>
            <td className="py-3 px-6 text-center">{call.uploadedTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}