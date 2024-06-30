// export default function Calls() {
//     return (
//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-bold text-white mb-4">ctrl-f</h2>
//         {/* Add content specific to Calls page */}
//       </main>
//     )
//   }
"use client"
// components/UploadFile.js
import { useState } from 'react';

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first.');

    setUploading(true);
    setMessage('');
    let presignedUrl = ''
    try {
      // Upload the file to S3 using the pre-signed URL
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="audio/*,video/*" />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
