import { Icon } from "@iconify/react";
import StatusBadge from "../../component/common/StatusBadge";


type InvoiceStatus = "paid" | "pending" | "draft";

const InvoiceList = ({ status }: { status: InvoiceStatus }) => {
  return (
    <div className="w-full rounded-lg bg-[var(--card-bg)] grid grid-cols-[repeat(24,minmax(0,1fr))] gap-2 items-center justify-between shadow-[0px_10px_10px_-10px_#48549F1A] py-[15px] px-4">

        <div className="col-span-4 font-bold text-[15px] leading-[15px] tracking-[-0.24px] text-[#7E88C3]">#<span className="text-text-primary">AA1449</span></div>
        <div className="col-span-5 font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">Due  14 Oct 2021</div>
        <div className="col-span-7 font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-[#858BB2]">Mellisa Clarke</div>


        <div className="col-span-4 font-bold text-[15px] leading-[24px] text-text-primary">£ 4,032.33</div>
        <div className="col-span-4 flex items-center justify-between">
          <StatusBadge status={status} />
          <div className="hidden sm:block"><Icon className="w-2 h-4 font-extrabold text-[#7C5DFA]" icon="weui:arrow-filled" /></div>
        </div>
        


    </div>
  );
};

export default InvoiceList;