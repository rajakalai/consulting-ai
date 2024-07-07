import Construction from '../components/Construction'

export default Construction;

// "use client"
// import { useState, ChangeEvent } from 'react';

// interface UploadFileProps {
//   presignedUrl: string;
// }

// const UploadFile = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file first.');
//       return;
//     }

//     setUploading(true);
//     setMessage('');

//     try {
//       // Upload the file to S3 using the pre-signed URL
//       let presignedUrl = "https://aicopilotstack-s3bucketaicopilotbucket4dc2ab34-me2vzgypakcv.s3.amazonaws.com/54d062c0-2946-4026-a12a-619bd805f2e9/3ba7ae7f-dc16-47d0-83eb-e65bfbdeeebb/deepgram-test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZI2LDHWYA2CNXGUA%2F20240630%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240630T184317Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host%3Bx-amz-meta-call_id&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiA90vOHCNA3QgIiW5%2FW8Wg2IkolI9uMFA2kvxuI0OuKUAIhAOSRmbJO%2B4rknDkCnxkytVVmNfW63gG2bqdUIOpWxKakKooDCEwQABoMNjM3NDIzMjcxMzQ0Igztj49G%2FrfjPFvPadkq5wJOcLVlBY%2FkO4aCkCiCC6D5yOP3q2%2BpjnvMt7CM4tzbWd7S5k6H%2FaIY9ZcYGxDDHKkLU8ZpaCshvEgWCe4oeFbnYZU1eT63th82MX7OWXc7AJscQ389g0k6KVwAyy6T65wkgBzyP1CvWVD8VWHZ9ulGZpO8Ww5hm3ZNisRyaIF2c1pV5FAbCTu%2BlUakFLbwKqcP0PkgaSYEKpepx3McYgXLOPmXD4M5yl0CiqufPihOrpiWuzlgxRYjh%2BX8uTJWr4wdmUVwj%2FAtd2pUk5nmYqwsv%2B6hbalArOKcWFHRpyQ0Ww9T2%2FOwC6tgiKzWxf49BW6md1A3jxssgtvTYpSqlhmV7SN%2Bjo%2Bj9d5t8VrGwxV7VwsvQhesQMOH6tJPquDNjpXOwahkRSS6JvKFZsbxyWeY0iiSX%2BVhy1%2FzYPmjngS1lfe5mEBbiKYqIB7D23oMvoHnaOmWfhPMfR7P9UEN51lD8IJalypmEzCTzIa0BjqdAVVPN7X2zGruN%2F55EM1qOEi3MaZmwAqbtoArXrco9m9AXFRzWXfXThWDd3ZHLxMqsia%2FeHeD3vg0qhZG26YWoyjMxMnDhQoXO62f167lHZWD%2FaDG9Fos54Ixr8ZtKxZy4W%2BSNGhnm%2BJlv50xjfJKQKp8Gapg53I%2FnJvOLF0tP5bAFiAt%2BfkVUaeRUBz9pf7yNi0olM0eeWsy2OFLD5k%3D&X-Amz-Signature=f2b1eebb064e9cce06180b0a4f8c258ac393158878f450ad2a769a64bf9d3f89"
//       const response = await fetch(presignedUrl, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': file.type,
//           'x-amz-meta-call_id': 'e0e2335d-f38e-4879-b531-4e29858f7b7d',
//           //'x-amz-acl': 'public-read', // Add this header if needed
//           // Add any other headers required by the pre-signed URL
//         },
//         body: file,
//       });

//       if (response.ok) {
//         setMessage('File uploaded successfully!');
//       } else {
//         setMessage(`Failed to upload file. Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setMessage('Failed to upload file.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} accept="audio/*,video/*" />
//       <button onClick={handleUpload} disabled={uploading}>
//         {uploading ? 'Uploading...' : 'Upload'}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default UploadFile;