import { Icon } from "@iconify/react";
import StatusBadge from "../../component/common/StatusBadge";
import { Link } from "react-router-dom";
import type { Invoice } from "../../Types/invoice";


// type InvoiceStatus = "paid" | "pending" | "draft";

interface InvoiceListProps {
  invoice: Invoice;                                         // 👈 accept whole invoice
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoice }) => {

  const total = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );



  return (
    <Link to={`/detail/:${invoice.id}`} className="w-full rounded-lg bg-[var(--card-bg)] grid grid-cols-[repeat(24,minmax(0,1fr))] gap-2 items-center justify-between shadow-[0px_10px_10px_-10px_#48549F1A] py-[15px] px-4">

        <div className="col-span-4 font-bold text-[15px] leading-[15px] tracking-[-0.24px] text-[#7E88C3]">#<span className="text-text-primary">{invoice.id}</span></div>
        <div className="col-span-5 font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">Due  {invoice.paymentDue}</div>
        <div className="col-span-7 font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-[#858BB2]">{invoice.clientName}</div>


        <div className="col-span-4 font-bold text-[15px] leading-[24px] text-text-primary">£ {total.toFixed(2)}</div>
        <div className="col-span-4 flex items-center justify-between">
          <StatusBadge status={invoice.status} />
          <div className="hidden sm:block"><Icon className="w-2 h-4 font-extrabold text-[#7C5DFA]" icon="weui:arrow-filled" /></div>
        </div>
        


    </Link>
  );
};

export default InvoiceList;