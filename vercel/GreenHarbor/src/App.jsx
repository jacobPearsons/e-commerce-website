import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import Home from './pages/Home';
import VideoPlayer from './components/VideoPlayer';
import NotFound from './pages/NotFound';
import AnimatedLogo from './components/AnimatedLogo';
import About from './pages/About'
import NewHere from './pages/NewHere'
import Sermons from './pages/Sermons'
import InHimSermon from './pages/InHimSermon'
import Events from './pages/Events'
import Contact from './pages/Contact'

function App() {
  return (
    <AuthProvider>
      <AnimatedLogo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/new-here" element={<NewHere />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/sermons/in-him" element={<InHimSermon />} />
        <Route path="/in-him" element={<InHimSermon />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/video/:id" element={
          <ProtectedRoute>
            <VideoPlayer />
          </ProtectedRoute>
        } />
        
        
        {/* Fallback Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
