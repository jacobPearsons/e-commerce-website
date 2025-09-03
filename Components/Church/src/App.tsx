import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/header'
import { MorphingText } from './components/morphingtext'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/sermons" element={<div>Sermons Page</div>} />
          <Route path="/events" element={<div>Events Page</div>} />
          <Route path="/ministries" element={<div>Ministries Page</div>} />
          <Route path="/give" element={<div>Give Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </main>
    </div>
  )
}

function Home() {
  const welcomeTexts = [
    "Welcome to New Creature in Christ",
    "Join us in worship",
    "Experience God's love",
    "Grow in faith together",
    "Be part of our family"
  ]

  return (
    <div className="text-center space-y-8">
      <MorphingText 
        texts={welcomeTexts}
        className="text-blue-600 dark:text-red-400"
      />
    </div>
  )
}

export default App
