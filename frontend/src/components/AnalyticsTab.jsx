import React from "react";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// Sample data for the line chart
const dailySalesData = [
  { name: "Jan 1", sales: 4000, revenue: 2400 },
  { name: "Jan 2", sales: 3000, revenue: 1398 },
  { name: "Jan 3", sales: 2000, revenue: 9800 },
  { name: "Jan 4", sales: 2780, revenue: 3908 },
  { name: "Jan 5", sales: 1890, revenue: 4800 },
  { name: "Jan 6", sales: 2390, revenue: 3800 },
  { name: "Jan 7", sales: 3490, revenue: 4300 },
];


const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = React.useState({
    users: 0,
    orders: 0,
    revenue: 0,
    products: 0,
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-emerald-500 to teal-700"
        />
        <AnalyticsCard
          title="Total Orders"
          value={analyticsData.orders.toLocaleString()}
          icon={Package}
          color="from-blue-500 to-indigo-700"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.revenue.toLocaleString()}`}
          icon={ShoppingCart}
          color="from-green-500 to-green-700"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={DollarSign}
          color="from-purple-500 to-pink-700"
        />
      </div>
      <motion.div
        className="bg-gray-800/60 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-emerald-300 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30" />
    <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
