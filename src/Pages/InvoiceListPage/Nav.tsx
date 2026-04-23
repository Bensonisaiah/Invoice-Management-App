import { Icon } from "@iconify/react";
import FilterByStatus from "../../component/common/FilterByStatus";


const Nav = () => {
  return (
    <div className="flex items-center justify-between mb-8 w-full">
      <div>
        <h2 className="font-bold text-4xl leading-none">Invoices</h2>
        <p className="font-medium text-[13px] leading-[15px] text-[#888EB0] dark:text-[#DFE3FA]">There are 7 total invoices</p>
      </div>


      <div className="flex items-center justify-center gap-4">
        <div>
          <FilterByStatus />
        </div>

        <div className="rounded-3xl gap-2 h-12 p-2 pr-4  bg-primary flex items-center justify-center text-white font-medium text-sm cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-white flex flex-col items-center justify-center">
            <Icon className="text-primary w-2.5 h-2.5" icon="picon:plus" />
          </div>
          <h3>New Invoice</h3>
        </div>
      </div>
      
    </div>
  );
};

export default Nav;