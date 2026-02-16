import React, { useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import ProductList from "../components/ProductList";
import AnalyticsTab from "../components/AnalyticsTab";
import { motion } from "framer-motion";
import CustomerList from "../components/CustomerList";
import AdminLayout from "../components/AdminLayout";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Title */}

        {/* Content based on active tab */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          {activeTab === "create" && <CreateProductForm />}
          {activeTab === "products" && <ProductList />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "customers" && <CustomerList />}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminPage;
