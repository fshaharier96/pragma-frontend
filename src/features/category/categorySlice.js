// import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";
// import API_BASE_URL from "../../config";

// export const fetchCategories = createAsyncThunk(
//   "categories/fetchCategories",
//    async () =>{
//      const response = await axios.get(`${API_BASE_URL}/api/categories`, {
//         headers:{
//             Authorization: "Bearer " + localStorage.getItem("token"),
//             "Content-Type": "application/json",
//             Accept: "application/json",
//         },
//         withCredentials: true,
//      })
//      return response.data.data;
//    }
// )

// const categorySlice = createSlice({
//     name:"categories",
//     initialState:{
//         items:[],
//         loading:false,
//         error:null,
//     },
//     reducers:{},
//     extraReducers:(builder) =>{
//         builder

//         .addCase(fetchCategories.pending,(state)=>{
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(fetchCategories.fulfilled,(state,action)=>{
//             state.loading = false;
//             state.items = action.payload;
//         })
//         .addCase(fetchCategories.rejected,(state,action)=>{
//             state.loading = false;
//             state.error = action.error.message;
//         });
//     }
// })

// export default categorySlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} from "./categoryApi";


// ========================================
// GET ALL CATEGORIES
// ========================================

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",

    async (_, thunkAPI) => {
        try {
            const response = await getCategories();

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );
        }
    }
);


// ========================================
// GET SINGLE CATEGORY
// ========================================

export const fetchCategory = createAsyncThunk(
    "categories/fetchCategory",

    async (id, thunkAPI) => {
        try {
            const response = await getCategory(id);

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch category"
            );
        }
    }
);


// ========================================
// CREATE CATEGORY
// ========================================

export const addCategory = createAsyncThunk(
    "categories/addCategory",

    async (categoryData, thunkAPI) => {
        try {
            const response = await createCategory(categoryData);

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to create category"
            );
        }
    }
);


// ========================================
// UPDATE CATEGORY
// ========================================

export const editCategory = createAsyncThunk(
    "categories/editCategory",

    async ({ id, data }, thunkAPI) => {
        try {
            const response = await updateCategory(id, data);

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update category"
            );
        }
    }
);


// ========================================
// DELETE CATEGORY
// ========================================

export const removeCategory = createAsyncThunk(
    "categories/removeCategory",

    async (id, thunkAPI) => {
        try {
            await deleteCategory(id);

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete category"
            );
        }
    }
);


// ========================================
// INITIAL STATE
// ========================================

const initialState = {

    categories: [],

    category: null,

    loading: false,

    creating: false,

    updating: false,

    deleting: false,

    error: null,

    success: false,

};


// ========================================
// SLICE
// ========================================

const categorySlice = createSlice({

    name: "categories",

    initialState,

    reducers: {

        clearError: (state) => {
            state.error = null;
        },

        clearSuccess: (state) => {
            state.success = false;
        },

        clearCategory: (state) => {
            state.category = null;
        },

    },


    extraReducers: (builder) => {

        // ========================================
        // FETCH ALL CATEGORIES
        // ========================================

        builder

            .addCase(fetchCategories.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchCategories.fulfilled, (state, action) => {

                state.loading = false;

                state.categories = action.payload.data ?? action.payload;

            })

            .addCase(fetchCategories.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });


        // ========================================
        // FETCH SINGLE CATEGORY
        // ========================================

        builder

            .addCase(fetchCategory.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchCategory.fulfilled, (state, action) => {

                state.loading = false;

                state.category = action.payload.data ?? action.payload;

            })

            .addCase(fetchCategory.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });


        // ========================================
        // CREATE CATEGORY
        // ========================================

        builder

            .addCase(addCategory.pending, (state) => {

                state.creating = true;

                state.error = null;

                state.success = false;

            })

            .addCase(addCategory.fulfilled, (state, action) => {

                state.creating = false;

                state.success = true;

                const newCategory =
                    action.payload.data ?? action.payload;

                state.categories.push(newCategory);

            })

            .addCase(addCategory.rejected, (state, action) => {

                state.creating = false;

                state.error = action.payload;

            });


        // ========================================
        // UPDATE CATEGORY
        // ========================================

        builder

            .addCase(editCategory.pending, (state) => {

                state.updating = true;

                state.error = null;

                state.success = false;

            })

            .addCase(editCategory.fulfilled, (state, action) => {

                state.updating = false;

                state.success = true;

                const updatedCategory =
                    action.payload.data ?? action.payload;

                const index = state.categories.findIndex(
                    (category) =>
                        category.id === updatedCategory.id
                );

                if (index !== -1) {

                    state.categories[index] = updatedCategory;

                }

                state.category = updatedCategory;

            })

            .addCase(editCategory.rejected, (state, action) => {

                state.updating = false;

                state.error = action.payload;

            });


        // ========================================
        // DELETE CATEGORY
        // ========================================

        builder

            .addCase(removeCategory.pending, (state) => {

                state.deleting = true;

                state.error = null;

            })

            .addCase(removeCategory.fulfilled, (state, action) => {

                state.deleting = false;

                state.success = true;

                state.categories =
                    state.categories.filter(
                        (category) =>
                            category.id !== action.payload
                    );

            })

            .addCase(removeCategory.rejected, (state, action) => {

                state.deleting = false;

                state.error = action.payload;

            });

    },

});


export const {
    clearError,
    clearSuccess,
    clearCategory,
} = categorySlice.actions;


export default categorySlice.reducer;