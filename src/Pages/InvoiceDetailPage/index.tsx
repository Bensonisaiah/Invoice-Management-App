import { Icon } from "@iconify/react";
import DetailHeader from "./DetailHeader";
import InvoiceDetail from "./InvoiceDetail";

const InvoiceDetailPage = () => {
  return (
    <div className="pt-16 px-60 w-full border-2">
      <div className="flex flex-col w-full border-2 gap-6">

        <div className="flex justify-between items-center w-[78px]">
          <Icon className="w-3 h-3 -mt-1 text-primary" icon="picon:left" />
          <h3 className="text-text-primary font-bold test-[15px] leading-[15px] tracking-[-0.25px]">Go back</h3>
        </div>

        <DetailHeader />
        <InvoiceDetail />       
      </div>

    </div>
  );
};

export default InvoiceDetailPage;