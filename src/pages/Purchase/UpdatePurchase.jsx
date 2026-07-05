import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiArrowLeft, FiCheckCircle, FiEdit3, FiPlus, FiSave, FiTrash2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../../config";

const authHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
  "Content-Type": "application/json",
  Accept: "application/json",
});

const emptyItem = {
  id: "",
  product_id: "",
  price: "",
  quantity: "",
};

const initialFormData = {
  purchase_no: "",
  supplier_id: "",
  purchase_date: "",
  invoice_no: "",
  reference_no: "",
  note: "",
};

const getResponseData = (response) => response.data.data || response.data || [];

const formatDateValue = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const normalizePurchaseItems = (purchase) => {
  const purchaseItems =
    purchase.items ||
    purchase.purchase_items ||
    purchase.purchaseDetails ||
    purchase.purchase_details ||
    [];

  if (!Array.isArray(purchaseItems) || purchaseItems.length === 0) {
    return [{ ...emptyItem }];
  }

  return purchaseItems.map((item) => ({
    id: item.id || "",
    product_id: item.product_id || item.product?.id || "",
    price: item.price || item.unit_price || item.purchase_price || "",
    quantity: item.quantity || item.qty || "",
  }));
};

const UpdatePurchase = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormData);
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPurchaseData = async () => {
      setLoading(true);
      setError("");

      try {
        const [supplierResponse, productResponse, purchaseResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/suppliers`, {
            headers: authHeaders(),
            withCredentials: true,
          }),
          axios.get(`${API_BASE_URL}/api/products`, {
            headers: authHeaders(),
            withCredentials: true,
          }),
          axios.get(`${API_BASE_URL}/api/purchases/${id}`, {
            headers: authHeaders(),
            withCredentials: true,
          }),
        ]);

        const purchase = getResponseData(purchaseResponse);

        setSuppliers(getResponseData(supplierResponse));
        setProducts(getResponseData(productResponse));
        setFormData({
          purchase_no: purchase.purchase_no || "",
          supplier_id: purchase.supplier_id || purchase.supplier?.id || "",
          purchase_date: formatDateValue(purchase.purchase_date),
          invoice_no: purchase.invoice_no || "",
          reference_no: purchase.reference_no || "",
          note: purchase.note || "",
        });
        setItems(normalizePurchaseItems(purchase));
      } catch (loadError) {
        console.error(loadError);
        setError("Purchase details, suppliers, or products could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadPurchaseData();
  }, [id]);

  const totalAmount = useMemo(
    () =>
      items.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + price * quantity;
      }, 0),
    [items]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("");
    setMessage("");
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    setError("");
    setMessage("");
    setItems((previousItems) =>
      previousItems.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [name]: value,
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((previousItems) => [...previousItems, { ...emptyItem }]);
  };

  const removeItem = (index) => {
    setItems((previousItems) =>
      previousItems.length === 1
        ? [{ ...emptyItem }]
        : previousItems.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const purchaseItems = items.map((item) => ({ 
      id: item.id || undefined,
      product_id: item.product_id,
      unit_price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 0,
      subtotal: (Number(item.price) || 0) * (Number(item.quantity) || 0),
    }));

    const hasInvalidItem = purchaseItems.some(
      (item) => !item.product_id || item.price <= 0 || item.quantity <= 0
    );

    if (hasInvalidItem) {
      setError("Please select a product and enter price and quantity for every purchase item.");
      setSubmitting(false);
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/purchases/update/${id}`,
        {
          ...formData,
          total_amount: totalAmount,
          items: purchaseItems,
          purchase_items: purchaseItems,
        },
        {
          headers: authHeaders(),
          withCredentials: true,
        }
      );

      setMessage("Purchase updated successfully.");
      setTimeout(() => navigate("/purchases"), 900);
    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError.response?.data?.message ||
          "Purchase could not be updated. Please check the details."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/purchases")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          <FiArrowLeft size={17} />
          Back to purchases
        </button>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                  <FiEdit3 size={22} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Update Purchase</h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Update purchase details and manage product item rows.
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="px-5 py-12 sm:px-7">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="h-12 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-12 animate-pulse rounded-lg bg-slate-200" />
                </div>
                <div className="mt-6 h-32 animate-pulse rounded-lg bg-slate-200" />
              </div>
            ) : (
              <div className="space-y-6 px-5 py-6 sm:px-7">
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
                  <div>
                    <label htmlFor="purchase_no" className="text-sm font-semibold text-slate-700">
                      Purchase no <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="purchase_no"
                      name="purchase_no"
                      value={formData.purchase_no}
                      onChange={handleChange}
                      required
                      readOnly
                      placeholder=""
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="supplier_id" className="text-sm font-semibold text-slate-700">
                      Supplier <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="supplier_id"
                      name="supplier_id"
                      value={formData.supplier_id}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="purchase_date" className="text-sm font-semibold text-slate-700">
                      Purchase date
                    </label>
                    <input
                      id="purchase_date"
                      name="purchase_date"
                      type="date"
                      value={formData.purchase_date}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="invoice_no" className="text-sm font-semibold text-slate-700">
                      Invoice no
                    </label>
                    <input
                      id="invoice_no"
                      name="invoice_no"
                      value={formData.invoice_no}
                      onChange={handleChange}
                      placeholder="Enter invoice number"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="reference_no" className="text-sm font-semibold text-slate-700">
                      Reference no
                    </label>
                    <input
                      id="reference_no"
                      name="reference_no"
                      value={formData.reference_no}
                      onChange={handleChange}
                      placeholder="Enter reference number"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="total_amount" className="text-sm font-semibold text-slate-700">
                      Total amount
                    </label>
                    <input
                      id="total_amount"
                      value={totalAmount.toFixed(2)}
                      readOnly
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200">
                  <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">Purchase Items</h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Select products from your system and enter price and quantity.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addItem}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <FiPlus size={17} />
                      Add Item
                    </button>
                  </div>

                  <div className="divide-y divide-slate-200">
                    {items.map((item, index) => {
                      const lineTotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);

                      return (
                        <div key={`${item.id || "new"}-${index}`} className="grid gap-4 px-4 py-4 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_auto] lg:items-end">
                          <div>
                            <label className="text-sm font-semibold text-slate-700">
                              Product <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="product_id"
                              value={item.product_id}
                              onChange={(event) => handleItemChange(index, event)}
                              required
                              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                            >
                              <option value="">Select product</option>
                              {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                  {product.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-semibold text-slate-700">
                              Price <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="price"
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.price}
                              onChange={(event) => handleItemChange(index, event)}
                              required
                              placeholder="0.00"
                              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-semibold text-slate-700">
                              Quantity <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="quantity"
                              type="number"
                              min="1"
                              step="1"
                              value={item.quantity}
                              onChange={(event) => handleItemChange(index, event)}
                              required
                              placeholder="0"
                              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-semibold text-slate-700">Line total</label>
                            <input
                              value={lineTotal.toFixed(2)}
                              readOnly
                              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="inline-flex h-11 items-center justify-center rounded-lg border border-red-100 px-3 text-red-600 transition hover:bg-red-50"
                            title="Remove item"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="note" className="text-sm font-semibold text-slate-700">
                    Note
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Add purchase note"
                    className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/purchases")}
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
                    {submitting ? "Updating..." : "Update Purchase"}
                  </button>
                </div>
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <FiEdit3 size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Purchase preview</p>
                  <p className="text-xs text-slate-500">Review before saving.</p>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="py-2 first:pt-0">
                  <p className="text-xs font-semibold uppercase text-slate-400">Purchase no</p>
                  <p className="mt-1 break-words text-sm font-medium text-slate-800">
                    {formData.purchase_no || "Purchase number"}
                  </p>
                </div>
                <div className="py-2">
                  <p className="text-xs font-semibold uppercase text-slate-400">Items</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{items.length}</p>
                </div>
                <div className="py-2 last:pb-0">
                  <p className="text-xs font-semibold uppercase text-slate-400">Amount</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900 shadow-sm">
              Purchase item totals are calculated from each row price and quantity.
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default UpdatePurchase;
