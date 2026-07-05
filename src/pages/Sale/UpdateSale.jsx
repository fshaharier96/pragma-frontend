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
  product_name: "",
  price: "",
  quantity: "",
};

const initialFormData = {
  sale_no: "",
  customer_id: "",
  sale_date: "",
  note: "",
};

const getResponseData = (response) => response.data.data || response.data || [];

const formatDateValue = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const firstAvailableValue = (...values) =>
  values.find((value) => value !== undefined && value !== null) ?? "";

const normalizeSaleItems = (saleData) => {
  const sale = saleData.sale || saleData;
  const saleItems =
    saleData.saleItems ||
    saleData.sale_items ||
    saleData.items ||
    saleData.saleDetails ||
    saleData.sale_details ||
    saleData.details ||
    sale.saleItems ||
    sale.sale_items ||
    sale.items ||
    sale.saleDetails ||
    sale.sale_details ||
    sale.details ||
    [];

  if (!Array.isArray(saleItems) || saleItems.length === 0) {
    return [{ ...emptyItem }];
  }

  return saleItems.map((item) => ({
    id: firstAvailableValue(item.id),
    product_id: firstAvailableValue(item.product_id, item.productId, item.product?.id),
    product_name: firstAvailableValue(item.product_name, item.productName, item.product?.name),
    price: firstAvailableValue(item.price, item.unit_price, item.unitPrice, item.sale_price),
    quantity: firstAvailableValue(item.quantity, item.qty),
  }));
};

const UpdateSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormData);
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSaleData = async () => {
      setLoading(true);
      setError("");

      try {
        const [customerResponse, productResponse, saleResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/customers`, {
            headers: authHeaders(),
            withCredentials: true,
          }),
          axios.get(`${API_BASE_URL}/api/products`, {
            headers: authHeaders(),
            withCredentials: true,
          }),
          axios.get(`${API_BASE_URL}/api/sales/${id}`, {
            headers: authHeaders(),
            withCredentials: true,
          }),
        ]);

        const saleData = getResponseData(saleResponse);
        const sale = saleData.sale || saleData;

        setCustomers(getResponseData(customerResponse));
        setProducts(getResponseData(productResponse));
        setFormData({
          sale_no: sale.sale_no || "",
          customer_id: sale.customer_id || sale.customer?.id || "",
          sale_date: formatDateValue(sale.sale_date),
          note: sale.note || "",
        });
        setItems(normalizeSaleItems(saleData));
      } catch (loadError) {
        console.error(loadError);
        setError("Sale details, customers, or products could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadSaleData();
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

    const saleItems = items.map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;

      return {
        id: item.id || undefined,
        product_id: item.product_id,
        price,
        unit_price: price,
        quantity,
        subtotal: price * quantity,
        total: price * quantity,
      };
    });

    const hasInvalidItem = saleItems.some(
      (item) => !item.product_id || item.unit_price <= 0 || item.quantity <= 0
    );

    if (hasInvalidItem) {
      setError("Please select a product and enter price and quantity for every sale item.");
      setSubmitting(false);
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/sales/update/${id}`,
        {
          ...formData,
          total_amount: totalAmount,
          items: saleItems,
          sale_items: saleItems,
          saleItems,
        },
        {
          headers: authHeaders(),
          withCredentials: true,
        }
      );

      setMessage("Sale updated successfully.");
      setTimeout(() => navigate("/sales"), 900);
    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError.response?.data?.message ||
          "Sale could not be updated. Please check the details."
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
          onClick={() => navigate("/sales")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          <FiArrowLeft size={17} />
          Back to sales
        </button>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                  <FiEdit3 size={22} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Update Sale</h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Update sale details and manage product item rows.
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
                    <label htmlFor="sale_no" className="text-sm font-semibold text-slate-700">
                      Sale no <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="sale_no"
                      name="sale_no"
                      value={formData.sale_no}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="customer_id" className="text-sm font-semibold text-slate-700">
                      Customer <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="customer_id"
                      name="customer_id"
                      value={formData.customer_id}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sale_date" className="text-sm font-semibold text-slate-700">
                      Sale date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="sale_date"
                      name="sale_date"
                      type="date"
                      value={formData.sale_date}
                      onChange={handleChange}
                      required
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
                      <h2 className="text-sm font-semibold text-slate-900">Sale Items</h2>
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
                      const selectedProductExists = products.some(
                        (product) => String(product.id) === String(item.product_id)
                      );

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
                              {item.product_id && !selectedProductExists && (
                                <option value={item.product_id}>
                                  {item.product_name || `Saved product #${item.product_id}`}
                                </option>
                              )}
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
                    placeholder="Add sale note"
                    className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/sales")}
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
                    {submitting ? "Updating..." : "Update Sale"}
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
                  <p className="text-sm font-semibold text-slate-900">Sale preview</p>
                  <p className="text-xs text-slate-500">Review before saving.</p>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="py-2 first:pt-0">
                  <p className="text-xs font-semibold uppercase text-slate-400">Sale no</p>
                  <p className="mt-1 break-words text-sm font-medium text-slate-800">
                    {formData.sale_no || "Sale number"}
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
              Sale item totals are calculated from each row price and quantity.
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default UpdateSale;
