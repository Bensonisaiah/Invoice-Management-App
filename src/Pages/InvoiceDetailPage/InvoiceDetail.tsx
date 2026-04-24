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




const InvoiceDetail = () => {
  return (
    <div className="h-screen flex flex-col p-12 bg-[var(--card-bg)] rounded-lg shadow-[0px_10px_10_-10px_#48549F1A]">
      <div className="w-full mb-5 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-[15px] leading-6 tracking-[-0.35px] text-[#888EB0]"># <span className="text-text-primary">XM9141</span> </div>
          <div className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">Graphic Design</div>
        </div>

        <div className="flex flex-col justify-end items-end font-medium text-[13px] leading-[18px] tracking-[-0.1px] text-left text-text-secondary">
          <p>19 Union Terrace</p>
          <p>London</p>
          <p>E1 3EZ</p>
          <p>United Kingdom</p>
        </div>
      </div>

      <div className="w-full mb-11 flex gap-[119px]">
        <div className="flex flex-col gap-8">
          <InvoiceInfoItem label="Invoice Date" value="21 Aug 2021" />
          <InvoiceInfoItem label="Payment Due" value="20 Sep 2021" />
        </div>

        <div className="h-full flex flex-col gap-2">
          <div className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">Bill To</div>
          <div className="font-bold text-[15px] leading-5 tracking-[-0.25px] text-text-primary">Alex Grim</div>
          <div className="font-medium text-[13px] leading-[18px] tracking-[-0.1px] text-text-secondary">
            <div>84 Church Way</div>
            <div>Bradford</div>
            <div>BD1 9PB</div>
            <div>United Kingdom</div>
          </div>
        </div>
        <div className="flex h-full flex-col gap-2">
          <div className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-text-secondary">Sent to</div>
          <div className="font-bold text-[15px] leading-5 tracking-[-0.25px] text-text-primary">alexgrim@mail.com</div>
        </div>
      </div>


      <div className="w-full border-2">
        <div className="rounded-t-lg bg-[#F9FAFE] dark:bg-[#252945]">
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default InvoiceDetail;