import React from "react";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
  invoiceId: string;
  /** Custom title, defaults to "Confirm Deletion" */
  title?: string;
  /** Custom message, defaults to "Are you sure you want to delete invoice #ID? This action cannot be undone." */
  message?: string;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onDelete,
  invoiceId,
  title = "Confirm Deletion",
  message = `Are you sure you want to delete invoice #${invoiceId}? This action cannot be undone.`,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-[calc(100%-2rem)] sm:max-w-md -translate-x-1/2 -translate-y-1/2"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div className="rounded-lg bg-[var(--card-bg)] px-12 py-[51px] shadow-[0px_10px_10px_-10px_#48549F1A]">
          {/* Title */}
          <h2
            id="delete-modal-title"
            className="text-2xl font-bold tracking-[-0.5px] leading-8 text-[rgb(var(--text-primary))]"
          >
            {title}
          </h2>

          {/* Description */}
          <p
            id="delete-modal-description"
            className="mt-3 font-medium text-[13px] leading-[22px] tracking-[-0.1px] text-[rgb(var(--text-secondary))]"
          >
            {message}
          </p>

          {/* Actions */}
          <div className="mt-10 flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="rounded-full px-6 py-4 text-[13px] font-bold leading-[18px] tracking-[-0.1px] text-[rgb(var(--text-primary))] bg-[rgb(var(--border-light))] hover:bg-[rgb(var(--border-light)/0.8)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="rounded-full px-6 py-4 text-[13px] font-bold leading-[18px] tracking-[-0.1px] text-white bg-[var(--danger)] hover:bg-[var(--danger-light)] transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;