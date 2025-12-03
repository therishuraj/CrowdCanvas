'use client';

import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';

interface UploadImageProps {
  onImageAdded: (imageUrl: string, sizeInMB?: number) => void;
  image?: string;
}

export function UploadImage({ onImageAdded, image }: UploadImageProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Calculate file size in MB
    const fileSizeInMB = file.size / (1024 * 1024);

    setUploading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Image = reader.result as string;
        
        // Upload to backend which will upload to S3
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BACKEND_URL}/v1/user/upload`, {
          image: base64Image
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Return the public URL and file size
        onImageAdded(response.data.url, fileSizeInMB);
        setUploading(false);
      };

      reader.onerror = () => {
        alert('Failed to read file');
        setUploading(false);
      };
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
      setUploading(false);
    }
  };

  if (image) {
    return (
      <div className="relative">
        <img 
          src={image} 
          alt="Uploaded" 
          className="w-full h-48 object-cover rounded-lg border-2 border-purple-600"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex items-center justify-center h-full">
        {uploading ? (
          <div className="text-gray-600">Uploading...</div>
        ) : (
          <div className="text-center">
            <div className="text-4xl text-gray-400 mb-2">+</div>
            <div className="text-sm text-gray-600">Click to upload image</div>
          </div>
        )}
      </div>
    </div>
  );
}
