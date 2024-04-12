import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-row h-screen md:flex-row overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-grow w-full">
                <Navbar />
                <div className="bg-slate-200 min-h-screen overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
