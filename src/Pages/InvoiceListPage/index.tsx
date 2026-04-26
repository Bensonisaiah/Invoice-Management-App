import { useState } from "react";
import InvoiceList from "./InvoiceList";
import Nav from "./Nav";
import CreateInvoiceModal from "../../component/Modals/CreateInvoiceModal";
import type { InvoiceStatus } from "../../Types/invoice";
import { useInvoice } from "../../context/InvoiceContext";


const InvoiceListPage = () => {

  const { invoices } = useInvoice();
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');

  // Derive the filtered invoices
  const filteredInvoices = statusFilter === 'all'
    ? invoices
    : invoices.filter(inv => inv.status === statusFilter);


  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
    <div className="pt-[141px] lg:pt-[77px] px-12 lg:px-52 xl:px-[355px] w-full">
      <Nav 
        onNewInvoice={() => setIsCreateOpen(true)}
        value={statusFilter === 'all' ? null : statusFilter}
        onChange={(val) => setStatusFilter(val ? (val as InvoiceStatus) : 'all')}
        invoiceCount={filteredInvoices.length} 
      />
      <div className="flex flex-col gap-4">
        {filteredInvoices.map(invoice => (
          <InvoiceList key={invoice.id} invoice={invoice} /> 
        ))}
        {filteredInvoices.length === 0 && (
          <p className="text-center text-text-secondary">No invoices found.</p>
        )}

      </div>
      
    </div>

    {isCreateOpen && (
      <CreateInvoiceModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    )}
    </>
  );
};

export default InvoiceListPage;