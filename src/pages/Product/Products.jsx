import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import { FiDownload, FiUserPlus, FiTrash2 } from "react-icons/fi";
import { FaPenToSquare } from "react-icons/fa6";

const Products = () => {
  const [products, setProducts] = useState([]);
   const [search, setSearch] = useState("");
 
   useEffect(() => {
     getProducts();
   }, []);
 
   const getProducts = async () => {
     try {
       const response = await axios.get(
         `${API_BASE_URL}/api/products`,
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
 
       setProducts(response.data.data);
     } catch (error) {
       console.error(error);
     }
   };
 
   const filteredProducts = products.filter(
     (product) =>
       product.name
         .toLowerCase()
         .includes(search.toLowerCase()) ||
       product.slug
         .toLowerCase()
         .includes(search.toLowerCase())
   );
 
   return (
     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
       {/* Page Header */}
       <div className="mb-8">
         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Products
         </h1>
         <p className="text-gray-600 text-sm md:text-base mt-1">
           Manage products and view their details.
         </p>
       </div>
 

       {/* Table Card */}
       <div className="bg-white rounded-xl shadow-md overflow-hidden">
         <div className="px-4 md:px-6 py-4 border-b border-gray-200">
           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
             <h2 className="font-semibold text-gray-900">Product List</h2>
             <input
               type="text"
               placeholder="Search product..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
             />
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm md:text-base whitespace-nowrap">
               <FiUserPlus size={18} />
               Add Product
             </button>
           </div>
         </div>
 
         {/* Table Responsive */}
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead className="bg-gray-50 border-b border-gray-200">
               <tr>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                    SI.
                 </th>
                 <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                   Product Name
                 </th>

                 <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                   Product Slug
                 </th>

                 <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm hidden md:table-cell">
                   Product Description
                 </th>
                 <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm hidden lg:table-cell">
                   Category Name
                 </th>
                 <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm hidden xl:table-cell">
                   Created Date
                 </th>
                 <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                   Action
                 </th>
               </tr>
             </thead>
 
             <tbody>
               {filteredProducts.length > 0 ? (
                 filteredProducts.map((product) => {
                   return (
                     <tr
                       key={product.id}
                       className="border-b border-gray-100 hover:bg-gray-50 transition"
                     >
                        <td className="px-4 md:px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">
                         <p className="truncate">{product.id}</p>
                        </td>
                       <td className="px-4 md:px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="min-w-0">
                             <p className="font-medium text-gray-900 text-sm truncate">
                               {product.name}
                             </p>
                           </div>
                         </div>
                       </td>

 
                       <td className="px-4 md:px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">
                         <p className="truncate">{product.slug || "N/A"}</p>
                       </td>

                        <td className="px-4 md:px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">
                         <p className="truncate">{product.description || "N/A"}</p>
                       </td>
                        <td className="px-4 md:px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">
                         <p className="truncate">{product.category || "N/A"}</p>
                       </td>
  

                        <td className="px-4 md:px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">
                         <p className="truncate">{product.created_at || "N/A"}</p>
                       </td>

 
                       <td className="px-4 md:px-6 py-4">
                         <div className="flex items-center gap-2">
                           <button className="p-2 hover:bg-blue-100 rounded-lg transition" title="Edit">
                             <FaPenToSquare size={18} className="text-blue-600" />
                           </button>
                           <button className="p-2 hover:bg-red-100 rounded-lg transition" title="Delete">
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
}

export default Products