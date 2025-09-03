import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
} from '@chakra-ui/react';

interface VerificationFormData {
  bio: string;
  contentCategories: string[];
  idDocument: File | null;
  selfieWithId: File | null;
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
  const toast = useToast();
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
      setFormData((prev) => ({ ...prev, [name]: file }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [name]: previewUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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

      const response = await axios.post('/api/auth/verify-profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Profile Verification</Heading>
        <Text>
          To become a verified creator, please provide the following information and documents.
          This helps us ensure the safety and authenticity of our platform.
        </Text>

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
              colorScheme="blue"
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