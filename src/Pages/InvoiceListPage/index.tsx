import { useState } from "react";
import InvoiceList from "./InvoiceList";
import Nav from "./Nav";
import CreateInvoiceModal from "../../component/Modals/CreateInvoiceModal";


const InvoiceListPage = () => {


  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
    <div className="pt-[141px] lg:pt-[77px] px-12 lg:px-52 xl:px-[355px] w-full">
      <Nav onNewInvoice={() => setIsCreateOpen(true)} />
      <div className="flex flex-col gap-4">
        <InvoiceList id="1" status="paid" /> 
        <InvoiceList id="2" status="pending" />
        <InvoiceList id="3" status="draft" />
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