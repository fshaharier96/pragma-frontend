import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {fetchCategories} from '../../features/category/categorySlice'
import { useNavigate } from "react-router-dom";
import { FiUserPlus, FiTrash2 } from "react-icons/fi";
import { FaPenToSquare } from "react-icons/fa6";
import LoadMoreButton from '../LoadMoreButton';

const CategoryList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {items:categories,loading,error} = useSelector((state)=>state.category)
    useEffect(()=>{
        dispatch(fetchCategories())
    },[dispatch])

    if(loading){
        return <p>Loading categories...</p>;
    }
    if(error){
        return <p>Error loading categories: {error}</p>;
    }
    console.log("Categories from Redux:", categories);
  return (
     <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="font-semibold text-gray-900">Category List</h2>
            {/* <input
              type="text"
              placeholder="Search category..."
              value={search}
              //onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
            /> */}
             <button 
             onClick ={()=>navigate("/category/create")}
             className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm md:text-base whitespace-nowrap">
              <FiUserPlus size={18} />
              Add Category
            </button>
          </div>
        </div>

        {/* Table Responsive */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Name
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Slug
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Parent
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Created At
                </th>
  
                <th className="text-left px-4 md:px-6 py-4 text-gray-700 font-medium text-sm">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => {
                  return (
                    <tr
                      key={category.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {category.name}
                            </p>
                          </div>
                        </div>
                      </td>


                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p className="truncate">{category.slug || "N/A"}</p>
                      </td>
                      
                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p className="truncate">{category.parent?.name || "N/A"}</p>
                      </td>

                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">
                        <p className="truncate">{category.created_at || "N/A"}</p>
                      </td>

                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/category/update/${category.id}`)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition"
                            title="Edit"
                          >
                            <FaPenToSquare size={18} className="text-blue-600" />
                          </button>
                          <button
                            // onClick={() => requestDelete(category.id, category.name)}
                            // disabled={deletingId === category.id}
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
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end m-4">
              <LoadMoreButton />
          </div>
        
        </div>
      </div>
  )
}

export default CategoryList