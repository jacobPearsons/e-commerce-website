import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  useToast,
  Image,
  Select,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

interface VerificationFormData {
  bio: string;
  contentCategories: string[];
  idDocument: File | null;
  selfieWithId: File | null;
}

interface LocationState {
  userId: string;
  username: string;
  displayName: string;
}

const contentCategories = [
  'Photography',
  'Videography',
  'Art',
  'Music',
  'Writing',
  'Fitness',
  'Fashion',
  'Lifestyle',
  'Other',
];

const ProfileVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<VerificationFormData>({
    bio: '',
    contentCategories: [],
    idDocument: null,
    selfieWithId: null,
  });
  const [previewUrls, setPreviewUrls] = useState<{
    idDocument?: string;
    selfieWithId?: string;
  }>({});

  // Check if user is authorized to access this page
  useEffect(() => {
    if (!user || user.role !== 'creator') {
      navigate('/');
      return;
    }

    // If no state is passed, redirect to home
    if (!location.state) {
      navigate('/');
    }
  }, [user, navigate, location.state]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'contentCategories') {
      const select = e.target as HTMLSelectElement;
      const categories = Array.from(select.selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, contentCategories: categories }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload a file smaller than 5MB',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a JPG, PNG, or PDF file',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: file }));

      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrls((prev) => ({ ...prev, [name]: previewUrl }));
      }
    }
  };

  const validateForm = () => {
    if (!formData.bio) {
      toast({
        title: 'Bio required',
        description: 'Please provide a bio',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (formData.contentCategories.length === 0) {
      toast({
        title: 'Content categories required',
        description: 'Please select at least one content category',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (!formData.idDocument) {
      toast({
        title: 'ID document required',
        description: 'Please upload your ID document',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (!formData.selfieWithId) {
      toast({
        title: 'Selfie required',
        description: 'Please upload a selfie with your ID',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('contentCategories', JSON.stringify(formData.contentCategories));
      
      if (formData.idDocument) {
        formDataToSend.append('idDocument', formData.idDocument);
      }
      if (formData.selfieWithId) {
        formDataToSend.append('selfieWithId', formData.selfieWithId);
      }

      const response = await fetch('/api/auth/verify-profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit verification');
      }

      toast({
        title: 'Profile verification submitted',
        description: 'Your profile is being reviewed. We will notify you once verified.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/profile');
    } catch (error) {
      toast({
        title: 'Error submitting verification',
        description: 'Please try again later',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const locationState = location.state as LocationState;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Profile Verification</Heading>
        <Text>
          To become a verified creator, please provide the following information and documents.
          This helps us ensure the safety and authenticity of our platform.
        </Text>

        {locationState && (
          <Alert status="info">
            <AlertIcon />
            Welcome, {locationState.displayName}! Please complete your verification to start creating content.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Bio</FormLabel>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself and your content..."
                minH="150px"
                disabled={isLoading}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Content Categories</FormLabel>
              <Select
                name="contentCategories"
                multiple
                value={formData.contentCategories}
                onChange={handleInputChange}
                size="md"
                disabled={isLoading}
              >
                {contentCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                Please select at least one content category
              </FormErrorMessage>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>ID Document</FormLabel>
              <Input
                type="file"
                name="idDocument"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                p={1}
                disabled={isLoading}
              />
              {previewUrls.idDocument && (
                <Box mt={2}>
                  <Image
                    src={previewUrls.idDocument}
                    alt="ID Document Preview"
                    maxH="200px"
                    objectFit="contain"
                  />
                </Box>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Selfie with ID</FormLabel>
              <Input
                type="file"
                name="selfieWithId"
                accept="image/*"
                onChange={handleFileChange}
                p={1}
                disabled={isLoading}
              />
              {previewUrls.selfieWithId && (
                <Box mt={2}>
                  <Image
                    src={previewUrls.selfieWithId}
                    alt="Selfie Preview"
                    maxH="200px"
                    objectFit="contain"
                  />
                </Box>
              )}
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              size="lg"
              isLoading={isLoading}
              loadingText="Submitting..."
            >
              Submit Verification
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default ProfileVerification;