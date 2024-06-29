// export default function Calls() {
//     return (
//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-bold text-white mb-4">ctrl-f</h2>
//         {/* Add content specific to Calls page */}
//       </main>
//     )
//   }
"use client"
import React, { useState, useRef } from 'react';
import axios from 'axios'; // Or your preferred HTTP client

const UploadLargeFile = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      startUpload(file);
    }
  };

  const startUpload = async (file) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Replace with your actual pre-designed URL
      const uploadUrl = 'https://your-server.com/api/upload';

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(uploadUrl, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      // Handle successful upload
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      setUploadError(error);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Large File</h2>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="*" // Accept all file types
      />

      {isUploading && (
        <div>
          <p>Uploading... {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" />
        </div>
      )}

      {uploadError && <p>Error: {uploadError.message}</p>}
    </div>
  );
};

export default UploadLargeFile;
