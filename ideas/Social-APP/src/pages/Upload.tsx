import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
  TextField,
  FormControlLabel,
  Switch,
  InputAdornment
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios, { AxiosProgressEvent } from 'axios';
import { useNavigate } from 'react-router-dom';

interface ErrorState {
  type: 'error' | 'success';
  message: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
  data?: any;
}

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<ErrorState | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [isPrivate, setIsPrivate] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      setError({ type: 'error', message: 'Invalid file type. Please upload a video file.' });
      return;
    }

    const selectedFile = acceptedFiles[0];
    
    // Validate file type
    if (!selectedFile.type.startsWith('video/')) {
      setError({ type: 'error', message: 'Please upload a video file' });
      return;
    }

    // Validate file size (max 100MB)
    if (selectedFile.size > 100 * 1024 * 1024) {
      setError({ type: 'error', message: 'File size must be less than 100MB' });
      return;
    }

    setFile(selectedFile);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.wmv']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) {
      setError({ type: 'error', message: 'Please select a file to upload' });
      return;
    }

    if (!title.trim()) {
      setError({ type: 'error', message: 'Please enter a title' });
      return;
    }

    if (price < 0) {
      setError({ type: 'error', message: 'Price cannot be negative' });
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('isPrivate', isPrivate.toString());

    try {
      const response = await axios.post<UploadResponse>('/api/content/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
          }
        }
      });

      // Handle successful upload
      console.log('Upload successful:', response.data);
      
      // Show success message
      setError({ type: 'success', message: 'Video uploaded successfully!' });
      
      // Reset form after a delay
      setTimeout(() => {
        setFile(null);
        setTitle('');
        setDescription('');
        setPrice(0);
        setIsPrivate(false);
        setProgress(0);
        setError(null);
        
        // Navigate to the video page or dashboard
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error uploading video';
      setError({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upload Video
      </Typography>

      {error && (
        <Alert 
          severity={error.type} 
          sx={{ mb: 2 }}
          onClose={() => setError(null)}
        >
          {error.message}
        </Alert>
      )}

      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          mb: 3,
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover'
          }
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography>
          {isDragActive
            ? 'Drop the video here'
            : 'Drag and drop a video file here, or click to select'}
        </Typography>
        {file && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {file.name}
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Video Details
        </Typography>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          error={error?.type === 'error' && !title.trim()}
          helperText={error?.type === 'error' && !title.trim() ? 'Title is required' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: { min: 0 }
          }}
          error={error?.type === 'error' && price < 0}
          helperText={error?.type === 'error' && price < 0 ? 'Price cannot be negative' : ''}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          }
          label="Private Content"
        />
      </Box>

      {uploading && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CircularProgress variant="determinate" value={progress} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Uploading: {progress}%
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={uploading || !file}
        fullWidth
        size="large"
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </Button>
    </Box>
  );
};

export default Upload;