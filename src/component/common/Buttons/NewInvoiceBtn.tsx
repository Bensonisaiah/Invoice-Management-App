import { Icon } from "@iconify/react";


const NewInvoiceBtn = () => {
  return(
        <div className="rounded-3xl gap-2 h-12 p-2 pr-4  bg-primary hover:bg-[#9277FF] flex items-center justify-center text-white font-medium text-sm cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-white flex flex-col items-center justify-center">
            <Icon className="text-primary w-2.5 h-2.5" icon="picon:plus" />
          </div>
          <h3>New Invoice</h3>
        </div>
  );
};

export default NewInvoiceBtn;