import { Menu, Bell } from 'lucide-react';

const Navbar = ({ setSidebarOpen, user, setUser, openProfile }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 z-10 sticky top-0">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 mr-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-lg text-blue-600">Birthdays</span>
        </div>
        
        <div className="flex items-center space-x-4 ml-auto">
          <button className="p-2 text-gray-400 hover:text-gray-500 relative">
            <span className="sr-only">View notifications</span>
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          
          <button 
            onClick={openProfile}
            className="flex items-center hover:bg-gray-50 px-3 py-1.5 rounded-xl transition-colors group"
          >
            <img 
              className="h-8 w-8 rounded-full bg-gray-300 ring-2 ring-white object-cover hidden sm:block group-hover:ring-blue-100" 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} 
              alt="User" 
            />
            <span className="ml-3 font-medium text-gray-700 hidden sm:block group-hover:text-blue-600">
              {user?.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
