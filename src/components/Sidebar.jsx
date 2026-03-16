import { Home, Calendar, Settings, LogOut, Plus } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen, setUser, openProfile, openAddBirthday }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Birthdays</h1>
        </div>

        <nav className="p-4 space-y-2">
          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
            <NavLink 
              to="/dashboard" 
              className={({isActive}) => `flex items-center px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Home className="w-5 h-5 mr-3" />
              <span className="font-medium">Dashboard</span>
            </NavLink>

            <NavLink 
              to="/events" 
              className={({isActive}) => `flex items-center px-4 py-3 rounded-xl transition-colors mt-1 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span className="font-medium">All Events</span>
            </NavLink>

            <button 
              onClick={openProfile}
              className="flex w-full items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors mt-1"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span className="font-medium">Profile Settings</span>
            </button>
          </div>

          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick Actions</p>
            <button 
              onClick={openAddBirthday}
              className="flex w-full items-center px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5 mr-3" />
              <span className="font-medium">Add Event</span>
            </button>
          </div>
          
          <div className="border-t border-gray-100 my-4"></div>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
