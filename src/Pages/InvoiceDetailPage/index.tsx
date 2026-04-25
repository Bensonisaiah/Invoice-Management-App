import { Icon } from "@iconify/react";
import DetailHeader from "./DetailHeader";
import InvoiceDetail from "./InvoiceDetail";
import EditInvoiceModal from "../../component/Modals/EditModal";
import { useState } from "react";
import DeleteConfirmationModal from "../../component/Modals/DeleteConfirmationModal";
import { useNavigate, useParams } from "react-router-dom";
import { useInvoice } from "../../context/InvoiceContext";

const InvoiceDetailPage = () => {

  const navigate = useNavigate();

    const { invoices, deleteInvoice, markAsPaid } = useInvoice();
  const { id } = useParams<{ id: string }>();
  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) return <p>Invoice not found.</p>;

  const [isModalOpen, setIsModalOpen] = useState(false);


  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    if (invoice) {
      deleteInvoice(invoice.id);
      setShowDeleteModal(false);
      navigate(-1);
      // navigate back to list, e.g., history.push('/')
    }
  };

  
  return (
    <>
    <div className="pt-32 px-10 lg:pt-16 lg:px-56 w-full">
      <div className="flex flex-col w-full gap-6">

        <div onClick={() => navigate(-1)} className="flex justify-between items-center w-[78px]">
          <Icon className="w-3 h-3 -mt-1 text-primary" icon="picon:left" />
          <h3 className="text-text-primary font-bold test-[15px] leading-[15px] tracking-[-0.25px]">Go back</h3>
        </div>

        <DetailHeader 
        onEdit={() => setIsModalOpen(true)}
        onDelete={() => setShowDeleteModal(true)}
        markAsPaid={() => markAsPaid(invoice.id)} />

        <InvoiceDetail invoice={invoice} />       
      </div>

    </div>

    <DeleteConfirmationModal
      isOpen={showDeleteModal}
      onCancel={() => setShowDeleteModal(false)}
      onDelete={handleDelete}
      invoiceId={invoice?.id ?? ""}
      // Optional overrides:
      // title="Custom Title"
      // message="Your custom message"
    />


    {isModalOpen && invoice && <EditInvoiceModal invoice={invoice} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

  </>
  );
};

export default InvoiceDetailPage;