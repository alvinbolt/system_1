import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

type DashboardLayoutProps = {
  children: ReactNode;
  sidebar: ReactNode;
};

const DashboardLayout = ({ children, sidebar }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-md transition-width duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-16'} flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className={`text-xl font-bold text-primary-900 ${sidebarOpen ? 'block' : 'hidden'}`}>Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {sidebar}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <motion.main
          className="flex-grow p-6 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
