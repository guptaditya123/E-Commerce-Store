import React from "react";
import { userStore } from "../store/userStore";
import { useEffect } from "react";
import { useState } from "react";
import { Search, Ticket, X } from "lucide-react";
import { cartStore } from "../store/cartStore";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";


const CustomerList = () => {
  const [customer, setCustomer] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllUser } = userStore();
  const { couponHandler } = cartStore();

const submitHandler = () => {
 try{
    if (!coupon || !discountPercentage || !expirationDate) {
    toast.error("Please fill in all fields");
    return;
  }
  let couponData= {
    code: coupon.trim(),
    id: selectedUser._id,
    discountPercentage: parseFloat(discountPercentage),
    expirationDate: new Date(expirationDate).toISOString(),
  }
  console.log("Submitting coupon data:", couponData);
    couponHandler(couponData);
  } catch (error) {
    console.error("Error submitting coupon:", error);
    toast.error( error.response?.data?.message || "An error occurred");
  }}

  const handleSearch=(e)=>{
    e.preventDefault();
    
  }

  useEffect(() => {
    setLoading(true);
    getAllUser()
      .then((data) => setCustomer(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col w-[80%] mx-auto">
      <div  className="flex items-center mb-4 gap-4 justify-between">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">
        Customer List
      </h2>
      <form onSubmit={handleSearch} className="flex justify-between w-2/3 border border-gray-700 rounded-md px-3 py-2 cursor-pointer hover:border-emerald-500 transition-colors">
        <input type="text" 
        className="outline-none"
        placeholder="Search customers..."
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={20} className="text-gray-400 hover:text-emerald-400 cursor-pointer" />
        </form>
      </div>

      {/* create a table to display customers with name, email and role */}
      <table className="w-full text-left mt-4">
        <thead>
          <tr>
            <th className="border-b border-gray-700 py-2">Name</th>
            <th className="border-b border-gray-700 py-2">Email</th>
            <th className="border-b border-gray-700 py-2">Create Coupon</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((cust) => (
            <tr key={cust._id}>
              <td className="border-b border-gray-700 py-2">{cust.name}</td>
              <td className="border-b border-gray-700 py-2">{cust.email}</td>
              <td className="border-b border-gray-700 py-2">
                <button
                  className="px-3 py-1 bg-emerald-600 text-white cursor-pointer rounded-md flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                  onClick={() => {
                    setSelectedUser(cust);
                    setModalOpen(true);
                  }}
                >
                  <Ticket size={18} />
                  Create
                </button>
              </td>
            </tr>
          ))}
          {modalOpen && (
            <div
              className="fixed inset-0   flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300"
              onClick={() => {
                setModalOpen(false);
                setSelectedUser(null);
                setCoupon(null);
                setDiscountPercentage(0);
                setExpirationDate("");
              }}
            >
              <div
                className="bg-gray-800 rounded-lg shadow-2xl w-[520px] max-w-[90vw] transform transition-all duration-300 scale-100 animate-in"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-white">
                    Create Coupon
                  </h3>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedUser(null);
                      setCoupon(null);
                      setDiscountPercentage(0);
                      setExpirationDate("");
                    }}
                    className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded-md"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="w-full px-3 py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-500"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    {console.log("Selected User:", selectedUser)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Discount Percentage
                    </label>
                    <input
                      type="number"
                      placeholder="Enter discount %"
                      className="w-full px-3 py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-500"
                      value={discountPercentage}
                      onChange={(e) => setDiscountPercentage(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-500"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-750 border-t border-gray-700 rounded-b-lg">
                  <button
                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors font-medium"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium shadow-sm"
                    onClick={submitHandler}
                  >
                    Create Coupon
                  </button>
                </div>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
