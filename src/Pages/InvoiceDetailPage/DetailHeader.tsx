import DeleteBtn from "../../component/common/Buttons/DeleteBtn";
import EditBtn from "../../component/common/Buttons/EditBtn";
import MarkAsPaidBtn from "../../component/common/Buttons/MarkAsPaidBtn";
import StatusBadge from "../../component/common/StatusBadge";


const DetailHeader = () => {
  return (
    <div className="flex justify-between px-8 py-6 rounded-lg bg-[var(--card-bg)] shadow-[0px_10px_10px_-10px_#48549F1A]">
      <div className="flex justify-between items-center gap-5">
        <p className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-[#858BB2] dark:text-[#DFE3FA]">Status</p>
        <StatusBadge status="pending" />
      </div>

      <div className="flex gap-4">
        <EditBtn />
        <DeleteBtn />
        <MarkAsPaidBtn />
      </div>
    </div>
  );
};

export default DetailHeader;