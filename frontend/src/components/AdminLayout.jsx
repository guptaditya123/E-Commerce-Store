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
    <div className="flex h-screen bg-gray-900">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: 256 }}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col bg-gray-800 border-r border-emerald-800 shadow-lg"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 h-16">
          {sidebarOpen ? (
            <>
              <Link to="/" className="flex items-center space-x-2">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl font-bold text-emerald-400"
                >
                  E-Commerce
                </motion.h2>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors"
              >
                <Menu size={20} />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="w-full flex justify-center p-2 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center ${
                sidebarOpen ? "justify-start px-4" : "justify-center px-0"
              } py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700"
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
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-t border-gray-700"
          >
            <p className="text-xs text-gray-400 text-center">
              Admin Panel v1.0
            </p>
          </motion.div>
        )}
      </motion.aside>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className={`md:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors ${mobileMenuOpen ? 'hidden' : ''}`}
      >
        <Menu size={24} />
      </button>

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
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            {/* Mobile Menu */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="md:hidden fixed top-0 left-0 h-full w-64 bg-gray-800 border-r border-emerald-800 shadow-lg z-50"
            >
              {/* Mobile Menu Header */}
              <div className="p-4 border-b border-gray-700 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-emerald-400">
                    E-Commerce
                  </h2>
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center justify-start px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="ml-3 font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header/Navbar */}
        <header className="bg-gray-800 border-b border-emerald-800 shadow-lg">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition duration-300"
              >
                <Home size={20} />
                <span className="hidden sm:inline">Back to Store</span>
              </Link>

              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
