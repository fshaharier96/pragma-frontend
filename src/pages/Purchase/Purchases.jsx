
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import { FiUserPlus, FiTrash2 } from "react-icons/fi";
import { FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDeleteToast } from "../../hooks/useDeleteToast";


const Purchases = () => {
   const navigate = useNavigate();
   const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const { requestDelete, deletingId, deleteToast } = useDeleteToast({
    entityName: "Purchase",
    endpoint: "/api/purchases/delete",
    onDeleted: (id) =>
      setPurchases((previousPurchases) =>
        previousPurchases.filter((purchase) => purchase.id !== id)
      ),
  });

  useEffect(() => {
    getPurchases();
  }, []);

  const getPurchases = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/purchases`,
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

      setPurchases(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.purchase_no
        ?.toLowerCase()
        ?.includes(search.toLowerCase())
  );

  // Get badge styling based on subscription status
  // const getStatusBadge = (status) => {
  //   if(status === true){
  //      return "bg-green-100 text-green-700";
  //   }else{
  //       return "bg-red-100 text-red-700";
  //   }
  // };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {deleteToast}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Purchases
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-1">
          Manage purchases and view their details.
        </p>
      </div>

     

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="font-semibold text-gray-900">Purchase List</h2>
            <input
              type="text"
              placeholder="Search Purchase..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
            />
             <button
              onClick={() => navigate("/purchase/create")}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm md:text-base whitespace-nowrap"
            >
              <FiUserPlus size={18} />
              Add Purchase
            </button>
          </div>
        </div>

        {/* Table Responsive */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  SI.
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Purchase No
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Supplier
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Purchase Date
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Total Amount
                </th>
  
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map((purchase) => {
                  return (
                    <tr
                      key={purchase.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >

                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p className="truncate">{purchase.id || "N/A"}</p>
                      </td>

                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {purchase.purchase_no}
                            </p>
                          </div>
                        </div>
                      </td>

                  
                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p className="truncate">{purchase.purchase_no || "N/A"}</p>
                      </td>

                       <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p className="truncate">{purchase.purchase_date || "N/A"}</p>
                      </td>

                       <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p className="truncate">{purchase.total_amount || "N/A"}</p>
                      </td>

  
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/purchase/update/${purchase.id}`)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition"
                            title="Edit"
                          >
                            <FaPenToSquare size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => requestDelete(purchase.id, purchase.purchase_no)}
                            disabled={deletingId === purchase.id}
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
                    No Purchase found
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

export default Purchases;
