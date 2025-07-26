import React, { useState } from 'react';
import { NavLink, Outlet , useMatch } from 'react-router-dom';


// --- Icon Components ---
type IconProps = { className?: string };

import { IconLayoutDashboardFilled ,IconFeatherFilled ,IconPlugConnected
 , IconMessageFilled ,IconCalendarWeek , IconMenu3 , IconStarFilled , IconUserFilled , IconSettingsFilled
} from '@tabler/icons-react';


type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { to: '/dashboard', name: 'Dashboard', icon: IconLayoutDashboardFilled },
    { to: '/mentors', name: 'Find Mentors', icon: IconFeatherFilled },
    { to: '/connections', name: 'My Connections', icon: IconPlugConnected
 },
    { to: '/messages', name: 'Messages', icon: IconMessageFilled },
    { to: '/calendar', name: 'Calendar', icon: IconCalendarWeek },
    { to: '/feedbacks', name: 'Feedbacks', icon: IconStarFilled },
    { to: '/profile', name: 'Profile', icon: IconUserFilled },
    { to: '/settings', name: 'Settings', icon: IconSettingsFilled
 },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30  z-30 transition-opacity lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-700 transform z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-y-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-center items-center h-20 border-b">
          <div className=" py-2 px-8">
            <h1 className="text-3xl font-extrabold text-blue-900 ">TAETIR</h1>
          </div>
        </div>
        <nav className="mt-4 no-underline ">
          <ul className='no-underline list-none'>
            {navItems.map((item) => {
              const Icon = item.icon;
              // Determine if the current route matches the nav item
              const match = useMatch(item.to);
              const isActive = !!match;
              return (
                <li key={item.name} className="px-4 py-1 hover:no-underline text-gray-500">
                  <NavLink
                    to={item.to}
                    onClick={() => { if (window.innerWidth < 1024) toggleSidebar() }}
                    className={
                      `flex hover:no-underline items-center space-x-3 text-white py-3 px-4 rounded-lg transition duration-200 ${
                        isActive ? 'bg-blue-50 text-blue-900 font-semibold ' : 'hover:bg-gray-100 hover:no-underline text-gray-300'
                      }`
                    }
                  >
                    <Icon className={`w-6 h-6 ${isActive ? '': 'text-gray-400 '}`} />
                    <span className={` hover:no-underline ${isActive ? '': 'text-gray-400 '}`}>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

type MainContentProps = {
  toggleSidebar: () => void;
};

const MainContent: React.FC<MainContentProps> = ({ toggleSidebar }) => {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50">
      <button
        onClick={toggleSidebar}
        className="lg:hidden mb-4 p-2 rounded-md bg-gray-200 text-gray-800"
        aria-label="Open sidebar"
      >
        <IconMenu3 />
      </button>
      <Outlet />
    </main>
  );
};

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="flex h-screen w-full bg-gray-50 ">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainContent toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default DashboardLayout;