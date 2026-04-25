import type { Invoice } from "../../Types/invoice";
import LineItem from "./LineItem";

interface InvoiceInfoItemProps {
  label: string;
  value: string;
}

const InvoiceInfoItem: React.FC<InvoiceInfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col justify-between h-12">
      <div className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">
        {label}
      </div>
      <div className="font-bold text-[15px] leading-5 tracking-[-0.25px] text-text-primary">
        {value}
      </div>
    </div>
  );
};




const InvoiceDetail: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  const total = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );




  return (
    <div className="flex flex-col p-12 bg-[var(--card-bg)] rounded-lg shadow-[0px_10px_10_-10px_#48549F1A]">
      <div className="w-full mb-5 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-[15px] leading-6 tracking-[-0.35px] text-[#888EB0]"># <span className="text-text-primary">{invoice.id}</span> </div>
          <div className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">{invoice.description}</div>
        </div>

        <div className="flex flex-col justify-end items-end font-medium text-[13px] leading-[18px] tracking-[-0.1px] text-left text-text-secondary">
          <p>{invoice.senderAddress.street}</p>
          <p>{invoice.senderAddress.city}</p>
          <p>{invoice.senderAddress.postCode}</p>
          <p>{invoice.senderAddress.country}</p>
        </div>
      </div>

      <div className="w-full mb-11 flex gap-[119px]">
        <div className="flex flex-col gap-8">
          <InvoiceInfoItem label="Invoice Date" value={invoice.createdAt} />
          <InvoiceInfoItem label="Payment Due" value={invoice.paymentDue} />
        </div>

        <div className="h-full flex flex-col gap-2">
          <div className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">Bill To</div>
          <div className="font-bold text-[15px] leading-5 tracking-[-0.25px] text-text-primary">{invoice.clientName}</div>
          <div className="font-medium text-[13px] leading-[18px] tracking-[-0.1px] text-text-secondary">
            <div>{invoice.clientAddress.street}</div>
            <div>{invoice.clientAddress.city}</div>
            <div>{invoice.clientAddress.postCode}</div>
            <div>{invoice.clientAddress.country}</div>
          </div>
        </div>
        <div className="flex h-full flex-col gap-2">
          <div className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">Sent to</div>
          <div className="font-bold text-[15px] leading-5 tracking-[-0.25px] text-text-primary">{invoice.clientEmail}</div>
        </div>
      </div>


      <div className="w-full h-96">
        <div className="flex flex-col p-8 gap-8 rounded-t-lg bg-[#F9FAFE] dark:bg-[#252945]">

          <div className="grid grid-cols-12 text-[#7E88C3] dark:text-[#DFE3FA]">
            <div className="col-span-6">Item Name</div>
            <div className="col-span-2">QTY.</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Total</div>
          </div>

          {invoice.items.map((item) => (
            <LineItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              unitPrice={item.price}
            />
          ))}



          




          
        </div>

        <div className="text-[#FFFFFF] bg-[#373B53] dark:bg-[#0C0E16] rounded-b-lg flex justify-between items-center p-8">
          <div className="font-medium text-[13px] leading-[18px] tracking-[-0.1px]">Amount Due</div>
          <div className="font-bold text-2xl leading-8 tracking-[-0.5px]">£ {total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;