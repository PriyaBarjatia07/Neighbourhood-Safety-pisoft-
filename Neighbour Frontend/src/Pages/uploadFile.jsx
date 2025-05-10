import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function UploadFile() {
  const [loading, setLoading] = useState(false);

  // Handle file upload
  const handleFileUpload = async (file) => {
    console.log('Uploading file:', file);
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5001/api/auth/upload', formData);

      if (response.status === 200) {
        message.success('File uploaded successfully');
      } else {
        message.error('File upload failed');
      }
    // } catch (error) {
    //   message.error('Error uploading file');
    } finally {
      setLoading(false);
    }
    return false;  // Prevent default behavior of file upload
  };

  return (
    <div>
      <h1>Upload a file</h1>
      <Upload
        customRequest={({ file, onSuccess, onError }) => {
          handleFileUpload(file)
            .then(() => onSuccess())
            .catch((err) => onError(err));
        }}
        showUploadList={false} // Hide default upload list
      >
        <Button icon={<UploadOutlined />} loading={loading}>
          Upload
        </Button>
      </Upload>
    </div>
  );
}

export default UploadFile;