import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";



const InvoiceListPage = () => {
  return (
    <div className="flex lg:flex-row flex-col h-screen w-full bg-background">
      <SideBar />
      <Outlet/>
    </div>
  );
};

export default InvoiceListPage;