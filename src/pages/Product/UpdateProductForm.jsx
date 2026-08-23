import { FiArrowLeft, FiCheckCircle, FiEdit3, FiLayers, FiSave } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormLoadingSkeleton from "../../components/FormLoadingSkeleton";
import axios from "axios";
import API_BASE_URL from "../../config";
import { CloudCog } from "lucide-react";

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    Accept: "application/json"
})
const initialValues = {
    name: "",
    slug: "",
    category_id: "",
    description: "",
};

const previewFields = [
    { name: "name", label: "Product", emptyText: "Product name" },
    { name: "slug", label: "Slug", emptyText: "product-slug" },
    { name: "description", label: "Description", emptyText: "Product description" },
]

const UpdateProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState({});
    const [loadingOptions, setLoadingOptions] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(initialValues);
    const submitText = "Update";
    const savingText = "Updating...";
    const [editingVariant, setEditingVariant] = useState(null);
    const commonClass = "mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";
    const variantInputClass =
        "w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none";

    useEffect(() => {
        setLoading(true);
        const loadProductData = async () => {
            try {
                const productResponse = await axios.get(`${API_BASE_URL}/api/products/${id}`,
                    {
                        headers: authHeaders(),
                        withCredentials: true
                    }
                )
                console.log("this is product response", productResponse)
                setFormData(productResponse.data.data);
            } catch (apiError) {
                console.log(apiError)
                setError("Product data can not be loaded")
            } finally {
                setLoading(false)
            }
        }
        loadProductData()
    }, [])

    useEffect(() => {
        const loadCategoryOptions = async () => {
            setLoadingOptions(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/categories`,
                    {
                        headers: authHeaders(),
                        withCredentials: true
                    })
                console.log("Category options loaded before:", options);

                setOptions(prevOptions => ({
                    ...prevOptions,
                    category: response.data.data.map(category => ({
                        label: category.name,
                        value: category.id
                    }))
                }));

            } catch (optionError) {
                console.error(optionError);
                setError("Some drop down options could not be loaded. Please refresh the page.");
            } finally {
                setLoadingOptions(false);
            }
        }
        loadCategoryOptions();
    }, [])

    const handleVariantChange = (index, e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            product_variants: (prev.product_variants || []).map((variant, variantIndex) =>
                variantIndex === index
                    ? { ...variant, [name]: value }
                    : variant
            ),
        }));
    };

    const removeVariant = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            product_variants: (prev.product_variants || []).filter(
                (_, variantIndex) => variantIndex !== indexToRemove
            ),
        }));

        setEditingVariant(null);
    };

    const toggleEdit = (index) => {
        console.log('toggle index',index)
        setEditingVariant(
            editingVariant === index
                ? null
                : index
        );
    }

    const addVariant = () => {
        const newVariant = {
            id: null,
            sku: "",
            purchase_price: "",
            selling_price: "",
            min_stock_quantity: "",
            status: "active",
        };

        setFormData((prev) => ({
            ...prev,
            product_variants: [
                ...(prev.product_variants || []),
                newVariant,
            ],
        }));

        // Automatically open the new variant for editing
        setEditingVariant(formData.product_variants?.length || 0);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setError("");
        setMessage("");

        console.log("form Data inside submit",formData)

        //return

        try {
            //const payload = {
                // name: formData.name,
                // slug: formData.slug,
                // category_id: formData.category_id,
                // description: formData.description,
                // variant_id: formData.product_variants?.[0]?.id,
                // sku: formData.product_variants?.[0]?.sku,
                // status: formData.product_variants?.[0]?.status,
                // purchase_price: formData.product_variants?.[0]?.purchase_price,
                // selling_price: formData.product_variants?.[0]?.selling_price,
                // min_stock_quantity: formData.product_variants?.[0]?.min_stock_quantity,

                // product_variants: [
                //     {
                //         id: formData.product_variants?.[0]?.id,
                //         sku: formData.product_variants?.[0]?.sku,
                //         status: formData.product_variants?.[0]?.status,
                //         purchase_price: formData.product_variants?.[0]?.purchase_price,
                //         selling_price: formData.product_variants?.[0]?.selling_price,
                //         min_stock_quantity:
                //             formData.product_variants?.[0]?.min_stock_quantity,
                //     },
                // ],
            //};

            const payload = formData



            const response = await axios.put(
                `${API_BASE_URL}/api/products/update/${id}`,
                payload,
                {
                    headers: authHeaders(),
                    withCredentials: true,
                }
            );

            setMessage(response.data.message || "Product updated successfully.");
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to update product.");
            }
        } finally {
            setSubmitting(false);
        }
    }
    //console.log("Form data 1:", formData);
    const handleChange = (e) => {
        const { name, value } = e.target;

        const variantFields = [
            "sku",
            "status",
            "purchase_price",
            "selling_price",
            "min_stock_quantity",
        ];

        if (variantFields.includes(name)) {
            setFormData((prev) => ({
                ...prev,
                product_variants: [
                    {
                        ...prev.product_variants[0],
                        [name]: value,
                    },
                ],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

   // console.log("Form data 2:", formData);
    return (
        <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <button
                    type="button"
                    onClick={()=>navigate("/products")}
                    className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
                    <FiArrowLeft />
                    Back to Products
                </button>
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                                    <FiEdit3 size={22} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">Update Product</h1>
                                    <p className="mt-1 text-sm text-slate-500">Update product identity, category and description.</p>
                                </div>
                            </div>
                        </div>

                        {
                            loading ? (
                                <FormLoadingSkeleton />
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6 sm:px-7">
                                    {error && (
                                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    )}

                                    {message && (
                                        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                            <FiCheckCircle size={17} />
                                            {message}
                                        </div>
                                    )}

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>Product name</span>
                                                <span className="text-base font-bold leading-none text-red-500" aria-label="required">*</span>
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder={"Enter product name"}
                                                className={commonClass}
                                            />

                                        </div>

                                        <div className="">
                                            <label htmlFor="slug" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>Slug</span>
                                                <span className="text-base font-bold leading-none text-red-500" aria-label="required">*</span>
                                            </label>
                                            <input
                                                id="slug"
                                                name="slug"
                                                type="text"
                                                required
                                                value={formData.slug}
                                                onChange={handleChange}
                                                placeholder={"Enter product slug"}
                                                className={commonClass}
                                            />

                                        </div>
                                        <div className="">
                                            <label htmlFor="category_id" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>Category</span>
                                                <span className="text-base font-bold leading-none text-red-500" aria-label="required">*</span>
                                            </label>
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                required
                                                value={formData.category_id}
                                                onChange={handleChange}
                                                //disabled={loadingOptions && field.optionsEndpoint}
                                                className={`${commonClass} disabled:cursor-not-allowed disabled:text-slate-400`}
                                            >
                                                <option value="select">Select category</option>
                                                {
                                                    (options.category || []).map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))
                                                }

                                            </select>
                                        </div>
                                        {/* <div>
                                            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>SKU</span>
                                                <span className="text-base font-bold leading-none text-red-500" aria-label="required">*</span>
                                            </label>
                                            <input
                                                id="sku"
                                                name="sku"
                                                type="text"
                                                required
                                                value={formData.product_variants?.[0]?.sku ?? ""}
                                                onChange={handleChange}
                                                placeholder={"product sku"}
                                                className={commonClass}
                                            />

                                        </div>
                                        <div>
                                            <label htmlFor="category_id" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>Status</span>
                                                <span className="text-base font-bold leading-none text-red-500" aria-label="required">*</span>
                                            </label>
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                required
                                                value={formData.product_variants?.[0]?.status ?? ""}
                                                onChange={handleChange}
                                                //disabled={loadingOptions && field.optionsEndpoint}
                                                className={`${commonClass} disabled:cursor-not-allowed disabled:text-slate-400`}
                                            >
                                                <option value="select">Select category</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>

                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>Purchase price</span>
                                                <span className="text-base font-bold leading-none text-red-500" aria-label="required">*</span>
                                            </label>
                                            <input
                                                id="purchase_price"
                                                name="purchase_price"
                                                type="text"
                                                required
                                                value={formData.product_variants?.[0]?.purchase_price ?? ""}
                                                onChange={handleChange}
                                                placeholder={"product purchase price"}
                                                className={commonClass}
                                            />

                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>Selling Price</span>
                                                <span className="text-base font-bold leading-none text-red-500" aria-label="required">*</span>
                                            </label>
                                            <input
                                                id="selling_price"
                                                name="selling_price"
                                                type="text"
                                                required
                                                value={formData.product_variants?.[0]?.selling_price ?? ""}
                                                onChange={handleChange}
                                                placeholder={"product selling price"}
                                                className={commonClass}
                                            />

                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>Minimum Stock Quantity</span>
                                            </label>
                                            <input
                                                id="min_stock_quantity"
                                                name="min_stock_quantity"
                                                type="number"
                                                required
                                                value={formData.product_variants?.[0]?.min_stock_quantity ?? ""}
                                                onChange={handleChange}
                                                placeholder={"product minimum stock quantity"}
                                                className={commonClass}
                                            />
                                        </div> */}

                                        <div className="md:col-span-2">
                                            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <span>Description</span>
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={4}
                                                placeholder={"Enter product description"}
                                                className={`${commonClass} resize-none`}
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-200 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h2 className="text-lg font-semibold">
                                                    Product Variants
                                                </h2>

                                                <p className="text-sm text-slate-500">
                                                    Manage all available variants.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={addVariant}
                                                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                                            >
                                                + Add Variant
                                            </button>
                                        </div>

                                    </div>

                                    {
                                        formData.product_variants?.map((variant, index) => (
                                            <div
                                                key={variant.id || index}
                                                className="mb-4 rounded-lg border border-slate-200 bg-white p-4"
                                            >
                                                <div className="flex justify-between">
                                                    <div>

                                                        <h3 className="font-semibold">
                                                            {variant.name}
                                                        </h3>

                                                        <p className="text-sm text-slate-500">
                                                            SKU : {variant.sku}
                                                        </p>

                                                    </div>

                                                    <div className="flex gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleEdit(index)}
                                                            className="font-medium text-blue-600 hover:text-blue-700"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => removeVariant(index)}
                                                            className="font-medium text-red-600 hover:text-red-700"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>

                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">

                                                    <div>
                                                        Purchase Price
                                                        <div className="font-medium">
                                                            {variant.purchase_price}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        Selling Price
                                                        <div className="font-medium">
                                                            {variant.selling_price}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        Status
                                                        <div className="font-medium">
                                                            {variant.status}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        Minimum Stock
                                                        <div className="font-medium">
                                                            {variant.min_stock_quantity}
                                                        </div>
                                                    </div>

                                                </div>

                                                {editingVariant === index && (
                                                    <div className="border-t pt-4 border-slate-200 grid md:grid-cols-2 gap-4 mt-5">
                                                        <input
                                                          name="name"
                                                          placeholder="Enter Variant Name"
                                                          value={variant.name}
                                                          onChange={(e)=>handleVariantChange(index,e)}
                                                          className={variantInputClass}
                                                        />
                                                        <input
                                                            name="sku"
                                                            value={variant.sku}
                                                            placeholder="Enter sku"
                                                            onChange={(e) => handleVariantChange(index, e)}
                                                            className={variantInputClass}
                                                        />

                                                        <input
                                                            name="purchase_price"
                                                            placeholder="Enter Purchase Price"
                                                            value={variant.purchase_price}
                                                            onChange={(e) => handleVariantChange(index, e)}
                                                            className={variantInputClass}
                                                        />

                                                        <input
                                                            name="selling_price"
                                                            placeholder="Enter Selling Price"
                                                            value={variant.selling_price}
                                                            onChange={(e) => handleVariantChange(index, e)}
                                                            className={variantInputClass}
                                                        />

                                                        <input
                                                            name="min_stock_quantity"
                                                            placeholder="Enter Minimum Stock"
                                                            value={variant.min_stock_quantity}
                                                            onChange={(e) => handleVariantChange(index, e)}
                                                            className={variantInputClass}
                                                        />

                                                        <select
                                                            name="status"
                                                            value={variant.status}
                                                            onChange={(e) => handleVariantChange(index, e)}
                                                            className={variantInputClass}
                                                        >
                                                            <option>active</option>
                                                            <option>inactive</option>
                                                        </select>

                                                    </div>

                                                )}
                                            </div>
                                        ))
                                    }


                                    <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                                        <button
                                            type="button"
                                            onClick={() => navigate(listPath)}
                                            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                                        >
                                            <FiSave size={18} />
                                            {submitting ? savingText : submitText}
                                        </button>
                                    </div>
                                </form>
                            )
                        }

                    </section>
                    <aside className="space-y-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                                    <FiLayers size={19} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">{"summaryTitle"}</p>
                                    <p className="text-xs text-slate-500">Review before saving.</p>
                                </div>
                            </div>

                            <div className="mt-5 border-t border-slate-200 pt-4">
                                {previewFields.map((field) => (
                                    <div key={field.name} className="py-2 first:pt-0 last:pb-0">
                                        <p className="text-xs font-semibold uppercase text-slate-400">{field.label}</p>
                                        <p className="mt-1 break-words text-sm font-medium text-slate-800">
                                            {formData[field.name] || field.emptyText || "Not set"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900 shadow-sm">
                            Product changes can affect purchase, sale and stock views.
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductForm;
