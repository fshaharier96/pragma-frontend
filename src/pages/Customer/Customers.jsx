import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import { FiUserPlus, FiTrash2 } from "react-icons/fi";
import { FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDeleteToast } from "../../hooks/useDeleteToast";

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const { requestDelete, deletingId, deleteToast } = useDeleteToast({
    entityName: "Customer",
    endpoint: "/api/customers/delete",
    onDeleted: (id) =>
      setCustomers((previousCustomers) =>
        previousCustomers.filter((customer) => customer.id !== id)
      ),
  });

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/customers`,
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      setCustomers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Get subscription status based on email
  const getSubscriptionStatus = (email) => {
    const statuses = ["Subscribed", "Not subscribed", "Pending"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return randomStatus;
  };

  // Get badge styling based on subscription status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Subscribed":
        return "bg-green-100 text-green-700";
      case "Not subscribed":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {deleteToast}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Customers
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-1">
          Manage customers and view their details.
        </p>
      </div>

     

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="font-semibold text-gray-900">Customer List</h2>
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
            />
             <button
              onClick={() => navigate("/customer/create")}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm md:text-base whitespace-nowrap"
            >
              <FiUserPlus size={18} />
              Add Customer
            </button>
          </div>
        </div>

        {/* Table Responsive */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Customers
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Email Subscription
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Location
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Orders
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Amount Spent
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => {
                  const subscriptionStatus = getSubscriptionStatus(customer.email);
                  return (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {customer.name?.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {customer.name}
                            </p>
                            <p className="text-gray-600 text-xs md:hidden">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 md:px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(subscriptionStatus)}`}>
                          {subscriptionStatus}
                        </span>
                      </td>

                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p className="truncate">{customer.phone || "N/A"}</p>
                      </td>

                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p>2</p>
                      </td>

                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm font-medium">
                        <p>$250.00</p>
                      </td>

                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/customer/update/${customer.id}`)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition"
                            title="Edit"
                          >
                            <FaPenToSquare size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => requestDelete(customer.id, customer.name)}
                            disabled={deletingId === customer.id}
                            className="p-2 hover:bg-red-100 rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50"
                            title="Delete"
                          >
                            <FiTrash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 text-sm"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
