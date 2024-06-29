"use client"

import { useState } from 'react';
import Modal from '../components/Modal';
import Table from '../components/Table';
import AddCallModal from '../components/AddCallModal';

interface Call {
  id: string;
  name: string;
  title: string;
  type: 'video' | 'audio';
  uploadedTime: string;
}

const initialCalls: Call[] = [
  { id: '1', name: 'John Doe', title: 'Introduction to LMS', type: 'video', uploadedTime: '2023-06-01 10:00 AM' },
  { id: '2', name: 'Jane Smith', title: 'EdTech Trends', type: 'audio', uploadedTime: '2023-06-02 02:30 PM' },
];

export default function Calls() {
  const [calls, setCalls] = useState<Call[]>(initialCalls);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (newCallData: any) => {
    // Mock API call
    await mockApiCall(newCallData);
    const newCallWithId: Call = {
      ...newCallData,
      id: Date.now().toString(),
      uploadedTime: new Date().toLocaleString(),
    } as Call;
    setCalls([...calls, newCallWithId]);
  };

  const mockApiCall = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Data sent to backend:', data);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Calls</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add
        </button>
      </div>

      <Table calls={calls} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCallModal 
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}