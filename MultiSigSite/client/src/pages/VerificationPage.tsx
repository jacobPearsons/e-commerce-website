import React from 'react';
import { Box } from '@chakra-ui/react';
import ProfileVerification from '../components/ProfileVerification';

const VerificationPage: React.FC = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <ProfileVerification />
    </Box>
  );
};

export default VerificationPage; 