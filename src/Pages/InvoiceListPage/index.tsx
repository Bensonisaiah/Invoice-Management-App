import InvoiceList from "./InvoiceList";
import Nav from "./Nav";


const InvoiceListPage = () => {
  return (
    <div className="pt-[77px] px-12 lg:px-24 border-2 w-full">
      <Nav />
      <div className="flex flex-col gap-4">
        <InvoiceList status="paid" /> 
        <InvoiceList status="pending" />
        <InvoiceList status="draft" />
      </div>
      
    </div>
  );
};

export default InvoiceListPage;