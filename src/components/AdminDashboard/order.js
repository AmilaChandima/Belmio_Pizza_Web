import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { format } from "date-fns";
import {
  FaCreditCard,
  FaMoneyBill,
  FaClock,
  FaSortAlphaDown,
  FaSortNumericDown,
} from "react-icons/fa";

const Orders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, card, cod
  const [sortBy, setSortBy] = useState("date"); // date or email

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch orders failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDelivery = async (orderId, status) => {
    try {
      console.log(status, orderId);
      await axios.patch(`${url}/api/orders/${orderId}/status`, {
        status,   // 👈 not orderStatus
      });
      
      
      
      fetchOrders(); // refresh
    } catch (err) {
      console.error("Failed to update delivery status:", err);
    }
  };

  // Filtering
  const filteredOrders = orders.filter((o) =>
    filter === "all" ? true : o.paymentMethod === filter
  );

  // Sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "email") return a.email.localeCompare(b.email);
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-[84vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
          All Orders
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <button
            className={`px-4 py-2 rounded ${
              filter === "all"
                ? "bg-orange-600 text-white"
                : "bg-white border"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "card"
                ? "bg-green-600 text-white"
                : "bg-white border"
            }`}
            onClick={() => setFilter("card")}
          >
            Card Payment
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "cod"
                ? "bg-yellow-600 text-white"
                : "bg-white border"
            }`}
            onClick={() => setFilter("cod")}
          >
            Cash on Delivery
          </button>

          <button
            className="px-4 py-2 rounded bg-white border flex items-center gap-2"
            onClick={() => setSortBy("date")}
          >
            <FaSortNumericDown /> Sort by Date
          </button>

          <button
            className="px-4 py-2 rounded bg-white border flex items-center gap-2"
            onClick={() => setSortBy("email")}
          >
            <FaSortAlphaDown /> Sort by Email
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOrders.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No orders found.
            </p>
          )}
          {sortedOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            >
              <div
                className={`p-4 border-l-4 ${
                  order.paymentMethod === "card"
                    ? "border-green-500"
                    : "border-yellow-500"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {order.email}
                    </p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      order.paymentStatus === "paid"
                        ? "bg-green-500"
                        : order.paymentStatus === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <FaClock className="mr-2 text-orange-500" />
                  {format(new Date(order.createdAt), "PPP p")}
                </p>

                <p className="text-sm text-gray-700 mb-4">
                  <strong>Delivery Address:</strong> {order.address}
                </p>

                <div className="border-t border-gray-200 pt-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-md"
                      >
                        <span className="text-gray-700">
                          {item.name}{" "}
                          {item.size ? `(${item.size})` : ""} × {item.quantity}
                        </span>
                        <span className="font-medium text-gray-800">
                          RS.{item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    {order.paymentMethod === "card" ? (
                      <FaCreditCard className="mr-2 text-green-500" />
                    ) : (
                      <FaMoneyBill className="mr-2 text-yellow-600" />
                    )}
                    {order.paymentMethod === "card"
                      ? "Card Payment"
                      : "Cash on Delivery"}
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-gray-900">
                      Total: RS.{order.totalPrice.toFixed(2)}
                    </p>
                    {order.orderStatus === "processing" && (
                      <>
                        <button
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          onClick={() =>
                            handleUpdateDelivery(order._id, "delivered")
                          }
                        >
                          Mark Delivered
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          onClick={() =>
                            handleUpdateDelivery(order._id, "canceled")
                          }
                        >
                          Mark Canceled
                        </button>
                      </>
                    )}
                    {order.orderStatus === "delivered" && (
                      <span className="px-3 py-1 bg-green-600 text-white text-sm rounded">
                        Delivered
                      </span>
                    )}
                    {order.orderStatus === "canceled" && (
                      <span className="px-3 py-1 bg-red-600 text-white text-sm rounded">
                        Canceled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
