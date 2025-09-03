#!/bin/bash

# Install dependencies
npm install

# Create necessary directories if they don't exist
mkdir -p src/components src/pages src/services src/utils src/styles

# Create index files
echo "import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);" > src/index.tsx

echo "import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VerificationPage from './pages/VerificationPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/verify' element={<VerificationPage />} />
    </Routes>
  );
};

export default App;" > src/App.tsx

# Create public directory and index.html
mkdir -p public
echo "<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='theme-color' content='#000000' />
    <meta name='description' content='OnlyFans Clone' />
    <title>OnlyFans Clone</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id='root'></div>
  </body>
</html>" > public/index.html

echo "Setup complete! You can now run 'npm start' to start the development server." 