import { ThemeToggle } from "../../component/common/ThemeToggle/ThemeToggle";


const SideBar = () => {
  return (
    <div className="h-20 lg:h-full w-full lg:w-[103px] lg:rounded-r-[20px] bg-[--side-bar] flex flex-row lg:flex-col items-center justify-between">
      <div>logo</div>

      <div className="flex w-fit flex-row lg:flex-col gap-4 lg:w-full">
        <div className="w-full flex items-center justify-center p-2">
          <ThemeToggle />
        </div>

        {/* <div className="border-r-2 w-2 h-full lg:border-t-2 lg:w-full border-[#494E6E]" /> */}
        <div className="w-px h-20 bg-[#494E6E] lg:w-full lg:h-px" />

        <div className="w-full flex items-center justify-center p-2">
          <img src="/main.png" alt="" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;