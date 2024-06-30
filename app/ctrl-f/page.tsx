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
// components/UploadFile.tsx
import { useState, ChangeEvent } from 'react';

interface UploadFileProps {
  presignedUrl: string;
}

const UploadFile: React.FC<UploadFileProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      let presignedUrl = "https://aicopilotstack-s3bucketaicopilotbucket4dc2ab34-me2vzgypakcv.s3.amazonaws.com/54d062c0-2946-4026-a12a-619bd805f2e9/f8cfc318-e32e-436b-8ee0-e7f860adb460/deepgram-test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZI2LDHWYMNSFBZWH%2F20240630%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240630T125624Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host%3Bx-amz-meta-call_id&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiBGX5dTUpTEBg%2FswvsZpmBraPqoOBzhBFXw0%2FdPtoW2iQIgGrJCA7o0Y430QCLuNcv5BhWVCD%2FoWegJ7Tk36vmtZ4QqigMIRhAAGgw2Mzc0MjMyNzEzNDQiDFm%2BfLRrdqBmdfhuqyrnAuvOLKya0wpi1RiQ49uk63Ka%2FGuPfEKc9PZFp%2BQlF9J1QlvutsmYjd0CyDNbuY9OyQAbTV14F903V7RLacD%2FMulVx9oYe3JCa7UNKZOxugcS00BUUxo3%2FGixHH3XddPGOKwC6sqoE1XfI0lzRpTbSn1Vg7jwr3SNeVzN1PxB7lfKxiOEJXKruqcHUv8pYX3rIWYpQ%2BRvzlD8xN9shbUI2Il7zaxcxTzQVWOkFzaUhN%2F5unb4d5tITu%2Fx5hr%2BB4QZ%2F%2BtQT%2F4a7vanOWyTyi%2FsgdCNTL%2BZ%2F8DJVzBIPRiSEWDAhSMs%2FdiGILaWwPNaS9yMFN95M6p0JJ9axTwp51g5L1wq27VU%2F1e47y9KJ2u19qEiCX%2FgieNIK1x5P0b9ZC%2FYb%2B0UQQy8%2BpzyaQ%2Bvt8mRXguSJtHkzUotMGm8018OnDd2zpuBrSd%2B0I10Go2qCl54nzpfwI2Vr%2FrLsA6vaLW6myrv0guGVoPFMPWrhbQGOp4Bm%2BvTtI2P4AWxb2ST70whHpwLUPsdVUiGc9o0ZcuqXBqBoQa4TVrwHynnZ7B7UMedy8kSJTmg4mILsLPsaF3rIprhleu3Fq5QKjF%2FWP6ol8TN%2BIvIUYU41DPD9yGGEEoyxmwUrc60WJzPzlACpHh5YeOWkR9zBcS3Y7SbLVmDr1rtoR5V7JqMkadqdo2B2LLwb0HBxzxDXrQo68LRR%2BQ%3D&X-Amz-Signature=80f1957338692c43720076e5732892b530a913322193913f5c9595a7a2c0034c"
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
};

export default UploadFile;
