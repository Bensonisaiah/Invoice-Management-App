import FilterByStatus from "../../component/common/FilterByStatus";
import NewInvoiceBtn from "../../component/common/Buttons/NewInvoiceBtn";


interface NavProps {
  onNewInvoice: () => void;
}

const Nav: React.FC<NavProps> = ({ onNewInvoice }) => {
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

        <div onClick={onNewInvoice}><NewInvoiceBtn /></div>
      </div>
      
    </div>
  );
};

export default Nav;