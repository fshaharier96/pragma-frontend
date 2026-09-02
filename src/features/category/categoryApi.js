import axios from "axios";
import API_BASE_URL from "../../config";

const getAuthHeaders = () =>{
    return {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json",
    }
}

// GET ALL CATEGORIES
export const getCategories = async () => {
    const response = await axios.get(
        `${API_BASE_URL}/api/categories`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// GET SINGLE CATEGORY
export const getCategory = async (id) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/categories/${id}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// CREATE CATEGORY
export const createCategory = async (categoryData) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/categories`,
        categoryData,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// UPDATE CATEGORY
export const updateCategory = async (id, categoryData) => {
    const response = await axios.put(
        `${API_BASE_URL}/api/categories/${id}`,
        categoryData,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// DELETE CATEGORY
export const deleteCategory = async (id) => {
    const response = await axios.delete(
        `${API_BASE_URL}/api/categories/${id}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};