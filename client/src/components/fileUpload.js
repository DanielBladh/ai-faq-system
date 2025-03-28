import React, { useState } from 'react';
import { API_URL } from '../services/api';

export default function FileUploader({ userId }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) {
      console.error('No file selected');
      return;
    }
    
    setStatus('uploading');
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId || 'unknown-user');

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      const result = await response.json();
      
      setStatus('success');
      setUploadProgress(100);
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload error:', error);
      setStatus('error');
      setUploadProgress(0);
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFileChange} />
      {file && (
        <div className="mb-4 text-sm">
          <p>File name: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: {file.type}</p>
        </div>
      )}
      {status === 'uploading' && (
        <div className="space-y-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
        </div>
      )}
      {file && status !== 'uploading' && (
        <button onClick={handleFileUpload}>Upload</button>
      )}
      {status === 'success' && (
        <p className="text-sm text-green-600">File uploaded successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Upload failed. Please try again.</p>
      )}
    </div>
  );
}
