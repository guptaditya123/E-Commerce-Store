import { BarChart, Menu, PlusCircle, ShoppingBasket, User, X, LogOut, Home } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { userStore } from "../store/userStore";

const menuItems = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
  { id: "customers", label: "Customers", icon: User },
];

const AdminLayout = ({ activeTab, setActiveTab, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = userStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: 256 }}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col bg-gray-800/95 backdrop-blur-sm border-r border-emerald-700/50 shadow-2xl"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50 h-16">
          {sidebarOpen ? (
            <>
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-emerald-400 transition-all duration-300"
                >
                  E-Commerce
                </motion.h2>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-700/70 text-gray-300 hover:text-emerald-400 transition-all duration-200"
              >
                <Menu size={20} />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="w-full flex justify-center p-2 rounded-lg hover:bg-gray-700/70 text-gray-300 hover:text-emerald-400 transition-all duration-200"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center ${
                sidebarOpen ? "justify-start px-4" : "justify-center px-0"
              } py-3 rounded-lg transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-gray-300 hover:bg-gray-700/70 hover:text-emerald-400"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3 font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-t border-gray-700/50"
          >
            <p className="text-xs text-gray-500 text-center">
              Admin Panel v1.0
            </p>
          </motion.div>
        )}
      </motion.aside>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={toggleMobileMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`md:hidden fixed top-3 left-3 z-50 p-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 ${mobileMenuOpen ? 'hidden' : ''}`}
      >
        <Menu size={22} />
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            />

            {/* Mobile Menu */}
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 h-full w-72 bg-gray-800/98 backdrop-blur-lg border-r border-emerald-700/50 shadow-2xl z-50"
            >
              {/* Mobile Menu Header */}
              <div className="p-5 border-b border-gray-700/50 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-emerald-400 transition-all duration-300">
                    E-Commerce
                  </h2>
                </Link>
                <motion.button
                  onClick={toggleMobileMenu}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-700/70 text-gray-300 hover:text-red-400 transition-all duration-200"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Mobile Menu Items */}
              <nav className="p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleMenuClick(item.id)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-start px-4 py-3.5 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : "text-gray-300 hover:bg-gray-700/70 hover:text-emerald-400"
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="ml-3 font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50 bg-gray-800/50">
                <p className="text-xs text-gray-500 text-center">
                  Admin Panel v1.0
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header/Navbar */}
        <header className="bg-gray-800/95 backdrop-blur-sm border-b border-emerald-700/50 shadow-lg">
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center space-x-4 md:pl-0 pl-14">
              <h1 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-all duration-300 p-2 rounded-lg hover:bg-gray-700/50"
              >
                <Home size={18} />
                <span className="hidden sm:inline text-sm">Store</span>
              </Link>

              <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-gray-700/70 rounded-lg hover:bg-gray-700 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>

              {/* Mobile User Icon */}
              <div className="md:hidden w-9 h-9 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <User size={16} className="text-white" />
              </div>

              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-700/70 hover:bg-red-600/80 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline text-sm">Logout</span>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
          <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
