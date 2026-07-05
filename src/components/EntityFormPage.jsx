import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiArrowLeft, FiCheckCircle, FiEdit3, FiLayers, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config";

const authHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
  "Content-Type": "application/json",
  Accept: "application/json",
});

const getResponseData = (response) => response.data.data || response.data || [];

const EntityFormPage = ({
  mode,
  entityName,
  endpoint,
  listPath,
  fields,
  initialValues,
  icon: Icon = FiEdit3,
  summaryTitle,
  summaryDescription,
  previewFields = [],
  helpText,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdate = mode === "update";
  const [formData, setFormData] = useState(initialValues);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(isUpdate);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectFields = useMemo(
    () => fields.filter((field) => field.type === "select" && field.optionsEndpoint),
    [fields]
  );

  useEffect(() => {
    const loadOptions = async () => {
      if (selectFields.length === 0) return;

      setLoadingOptions(true);
      try {
        const responses = await Promise.all(
          selectFields.map((field) =>
            axios.get(`${API_BASE_URL}${field.optionsEndpoint}`, {
              headers: authHeaders(),
              withCredentials: true,
            })
          )
        );

        const nextOptions = {};
        selectFields.forEach((field, index) => {
          nextOptions[field.name] = getResponseData(responses[index]);
        });
        setOptions(nextOptions);
      } catch (optionsError) {
        console.error(optionsError);
        setError("Some dropdown data could not be loaded.");
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, [selectFields]);

  useEffect(() => {
    if (!isUpdate) return;

    const loadRecord = async () => {
      setLoading(true);
      setError("");

      try {
        const base = endpoint.substring(0, endpoint.lastIndexOf("/"));
        console.log(base);
        const response = await axios.get(`${API_BASE_URL}${base}/${id}`, {
          headers: authHeaders(),
          withCredentials: true,
        });

        console.log("this is response",response);

        const record = getResponseData(response);
        const nextData = { ...initialValues };
        console.log(record);
        fields.forEach((field) => {
          const value = field.getValue
            ? field.getValue(record)
            : record[field.name] ?? record[field.fallbackName] ?? "";
          nextData[field.name] = field.type === "checkbox" ? Boolean(value) : value;
        });

        setFormData(nextData);
      } catch (loadError) {
        console.error(loadError);
        setError(`${entityName} details could not be loaded.`);
      } finally {
        setLoading(false);
      }
    };

    loadRecord();
  }, [endpoint, entityName, fields, id, initialValues, isUpdate]);

  const title = `${isUpdate ? "Update" : "Create"} ${entityName}`;
  const submitText = `${isUpdate ? "Update" : "Save"} ${entityName}`;
  const savingText = isUpdate ? "Updating..." : "Saving...";

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setError("");
    setMessage("");
    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const payload = fields.reduce((data, field) => {
      data[field.name] = field.type === "select" && formData[field.name] === "" ? null : formData[field.name];
      return data;
    }, {});

    try {
      const url = isUpdate ? `${API_BASE_URL}${endpoint}/${id}` : `${API_BASE_URL}${endpoint}`;
      const method = isUpdate ? "put" : "post";

      await axios[method](url, payload, {
        headers: authHeaders(),
        withCredentials: true,
      });

      setMessage(`${entityName} ${isUpdate ? "updated" : "created"} successfully.`);
      setTimeout(() => navigate(listPath), 900);
    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError.response?.data?.message ||
          `${entityName} could not be ${isUpdate ? "updated" : "created"}. Please check the details.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field) => {
    const commonClass =
      "mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";
    const requiredProps = field.required
      ? { required: true, "aria-required": "true" }
      : {};

    if (field.type === "textarea") {
      return (
        <textarea
          id={field.name}
          name={field.name}
          {...requiredProps}
          value={formData[field.name]}
          onChange={handleChange}
          rows={field.rows || 4}
          placeholder={field.placeholder}
          className={`${commonClass} resize-none`}
        />
      );
    }

    if (field.type === "select") {
      const allOptions = options[field.name] || field.options || [];
      const fieldOptions = field.optionFilter
        ? allOptions.filter((option) => field.optionFilter(option, { id, formData }))
        : allOptions;
      return (
        <select
          id={field.name}
          name={field.name}
          {...requiredProps}
          value={formData[field.name]}
          onChange={handleChange}
          disabled={loadingOptions && field.optionsEndpoint}
          className={`${commonClass} disabled:cursor-not-allowed disabled:text-slate-400`}
        >
          <option value="">{loadingOptions ? "Loading options..." : field.placeholder}</option>
          {fieldOptions.map((option) => (
            <option key={option.id ?? option.value} value={option.id ?? option.value}>
              {option[field.optionLabel || "name"] ?? option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "checkbox") {
      return (
        <label className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            {...requiredProps}
            checked={Boolean(formData[field.name])}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          {field.placeholder}
        </label>
      );
    }

    return (
      <input
        id={field.name}
        name={field.name}
        type={field.type || "text"}
        step={field.step}
        {...requiredProps}
        value={formData[field.name]}
        onChange={handleChange}
        placeholder={field.placeholder}
        className={commonClass}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate(listPath)}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          <FiArrowLeft size={17} />
          Back to {entityName.toLowerCase()}s
        </button>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                  <Icon size={22} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                  <p className="mt-1 text-sm text-slate-500">{summaryDescription}</p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="px-5 py-12 sm:px-7">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                <div className="mt-6 h-12 animate-pulse rounded-lg bg-slate-200" />
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div className="h-12 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-12 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
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
                  {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                      <label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <span>{field.label}</span>
                        {field.required && (
                          <span className="text-base font-bold leading-none text-red-500" aria-label="required">
                            *
                          </span>
                        )}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>

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
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <FiLayers size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{summaryTitle}</p>
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

            {helpText && (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900 shadow-sm">
                {helpText}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EntityFormPage;
