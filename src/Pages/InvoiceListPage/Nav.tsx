import FilterByStatus from "../../component/common/FilterByStatus";
import NewInvoiceBtn from "../../component/common/Buttons/NewInvoiceBtn";


interface NavProps {
  onNewInvoice: () => void;
  value: string | null;               // current filter value
  onChange: (val: string | null) => void; // filter change handler
  invoiceCount: number;
}

const Nav: React.FC<NavProps> = ({ onNewInvoice, onChange, value, invoiceCount }) => {
  return (
    <div className="flex items-center justify-between mb-8 w-full">
      <div>
        <h2 className="font-bold text-4xl leading-none">Invoices</h2>
        <p className="font-medium text-[13px] leading-[15px] text-[#888EB0] dark:text-[#DFE3FA]">There are {invoiceCount} total invoices</p>
      </div>


      <div className="flex items-center justify-center gap-4">
        <div>
          <FilterByStatus value={value} onChange={onChange} />
        </div>

        <div onClick={onNewInvoice}><NewInvoiceBtn /></div>
      </div>
      
    </div>
  );
};

export default Nav;