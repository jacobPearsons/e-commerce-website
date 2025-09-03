import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VerificationPage from './pages/VerificationPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/verify' element={<VerificationPage />} />
    </Routes>
  );
};

export default App;
