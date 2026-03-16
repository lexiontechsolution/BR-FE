import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ProfileModal from './ProfileModal';
import BirthdayModal from './BirthdayModal';

const Layout = ({ children, user, setUser, refreshBirthdays }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        user={user} 
        setUser={setUser}
        openProfile={() => setShowProfileModal(true)}
        openAddBirthday={() => setShowAddModal(true)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar 
          setSidebarOpen={setSidebarOpen} 
          user={user} 
          setUser={setUser} 
          openProfile={() => setShowProfileModal(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        user={user} 
        setUser={setUser} 
      />

      <BirthdayModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        user={user}
        onRefresh={refreshBirthdays}
      />
    </div>
  );
};

export default Layout;
