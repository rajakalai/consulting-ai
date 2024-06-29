import React, { useState } from 'react';

interface AddCallModalProps {
  onSubmit: (callData: any) => void;
  onClose: () => void;
}

export default function AddCallModal({ onSubmit, onClose }: AddCallModalProps) {
  const [newCall, setNewCall] = useState({ name: '', title: '', type: 'video' });
  const [fileName, setFileName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCall({ ...newCall, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newCall);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newCall.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-gray-800"
          required
        />
      </div>
      <div>
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newCall.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-gray-800"
          required
        />
      </div>
      <div>
        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          name="type"
          value={newCall.type}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-gray-800"
        >
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
      </div>
      <div>
        <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-700">Upload File</label>
        <div className="relative">
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileUpload}
            accept={newCall.type === 'video' ? 'video/*' : 'audio/*'}
            className="hidden"
            required
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 inline-flex items-center text-gray-700 hover:bg-gray-50"
          >
            Choose file
          </label>
          <span className="ml-2 text-gray-600">{fileName || 'No file chosen'}</span>
        </div>
      </div>
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
}