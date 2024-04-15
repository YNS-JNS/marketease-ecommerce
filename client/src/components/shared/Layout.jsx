import NavBar from "../NavBar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        // <div className="flex flex-row h-screen md:flex-row overflow-hidden">
        <div className="flex flex-row h-screen md:flex-row overflow-y-auto">
            <Sidebar />
            <div className="flex flex-col flex-grow w-full">
                <NavBar />
                {/* <div className="bg-slate-200 min-h-screen overflow-scroll"> */}
                <div className="bg-slate-200 min-h-screen overflow-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
