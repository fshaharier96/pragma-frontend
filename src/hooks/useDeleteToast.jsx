import { useEffect, useRef, useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiTrash2, FiX, FiXCircle } from "react-icons/fi";
import { deleteEntity } from "../utils/api";

const DeleteToast = ({ toast, deletingId, onCancel, onConfirm }) => {
  if (!toast) return null;

  const isConfirm = toast.type === "confirm";
  const isSuccess = toast.type === "success";
  const Icon = isConfirm ? FiAlertTriangle : isSuccess ? FiCheckCircle : FiXCircle;
  const iconClass = isConfirm
    ? "bg-red-100 text-red-600"
    : isSuccess
      ? "bg-emerald-100 text-emerald-600"
      : "bg-rose-100 text-rose-600";

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/12">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
            <Icon size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close toast"
              >
                <FiX size={16} />
              </button>
            </div>
            <p className="mt-1 text-sm leading-5 text-slate-600">{toast.message}</p>
          </div>
        </div>

        {isConfirm && (
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={Boolean(deletingId)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={Boolean(deletingId)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
            >
              <FiTrash2 size={16} />
              {deletingId ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const useDeleteToast = ({ entityName, endpoint, onDeleted }) => {
  const [toast, setToast] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const closeToast = () => {
    clearTimeout(timeoutRef.current);
    setToast(null);
  };

  const showTimedToast = (nextToast) => {
    clearTimeout(timeoutRef.current);
    setToast(nextToast);
    timeoutRef.current = setTimeout(() => setToast(null), 2800);
  };

  const requestDelete = (id, label) => {
    clearTimeout(timeoutRef.current);
    setToast({
      type: "confirm",
      id,
      title: `Delete ${entityName}?`,
      message: label
        ? `This will permanently delete "${label}".`
        : "This action cannot be undone.",
    });
  };

  const confirmDelete = async () => {
    if (!toast?.id) return;

    setDeletingId(toast.id);
    try {
      await deleteEntity(endpoint, toast.id);
      onDeleted(toast.id);
      showTimedToast({
        type: "success",
        title: `${entityName} deleted`,
        message: `${entityName} was deleted successfully.`,
      });
    } catch (error) {
      console.error(error);
      showTimedToast({
        type: "error",
        title: "Delete failed",
        message: error.response?.data?.message || `${entityName} could not be deleted.`,
      });
    } finally {
      setDeletingId(null);
    }
  };

  return {
    deletingId,
    requestDelete,
    deleteToast: (
      <DeleteToast
        toast={toast}
        deletingId={deletingId}
        onCancel={closeToast}
        onConfirm={confirmDelete}
      />
    ),
  };
};
