import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import PostSlider from './Components/PostSlider'
import RecentPosts from './Components/RecentPosts'
import ArticlePage from './Pages/ArticlePage'
import Admin from './Pages/Admin'

const App: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      {/* HomePage Section */}
      <Routes>
        <Route path="/" element={
            <div>
              <PostSlider />
              <div className="max-w-7xl mx-auto px-4 py-6">
                  <RecentPosts />
              </div>
            </div>
          }
        />
          {/* Articles Section */}
        <Route path="/article/:id" element={<ArticlePage />} />
        {/* Admin Section */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
