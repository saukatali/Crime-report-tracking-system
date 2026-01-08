import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, User, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/file-complaint', icon: PlusCircle, label: 'File Complaint' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="w-64 glass-effect border-r border-gray-200/50 dark:border-gray-700/50 h-[calc(100vh-4rem)] sticky top-16">
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:shadow-md'
              }`
            }
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isActive ? 'animate-float' : ''
                }`} />
                <span className="font-semibold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
