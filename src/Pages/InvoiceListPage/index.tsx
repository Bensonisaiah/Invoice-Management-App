import InvoiceList from "./InvoiceList";
import Nav from "./Nav";


const InvoiceListPage = () => {
  return (
    <div className="pt-[141px] lg:pt-[77px] px-12 lg:px-52 xl:px-[355px] w-full border-2">
      <Nav />
      <div className="flex flex-col gap-4">
        <InvoiceList id="1" status="paid" /> 
        <InvoiceList id="2" status="pending" />
        <InvoiceList id="3" status="draft" />
      </div>
      
    </div>
  );
};

export default InvoiceListPage;