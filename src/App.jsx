import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Properties from './pages/Properties'
import About from './pages/About'
import Contact from './pages/Contact'
import History from './pages/History'
import WelfareMedia from './pages/WelfareMedia'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/admin/Dashboard'
import ProjectDetails from './pages/ProjectDetails'
import PropertyDetails from './pages/PropertyDetails'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import PrivateEnquiryModal from './components/PrivateEnquiryModal'
import TopBanner from './components/TopBanner'
import { useState } from 'react'

function App() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/admin/dashboard');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardRoute && <TopBanner />}
      {!isDashboardRoute && <Navbar onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />}
      <main className={`flex-grow ${!isDashboardRoute ? 'pt-[38px]' : ''}`}>
        <Routes>
          <Route path="/" element={<Home onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />} />
          <Route path="/projects" element={<Projects onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />} />
          <Route path="/projects/:id" element={<ProjectDetails onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />} />
          <Route path="/properties" element={<Properties onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />} />
          <Route path="/properties/:id" element={<PropertyDetails onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />} />
          <Route path="/about" element={<About onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />} />
          <Route path="/history" element={<History onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />} />
          <Route path="/community-welfare" element={<WelfareMedia />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isDashboardRoute && <Footer onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />}

      <PrivateEnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />
    </div>
  )
}

export default App
