import { Link } from "react-router-dom";
import Logo from "./logo";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineShoppingCart, MdOutlineCreate, MdOutlinePreview, MdForwardToInbox, MdOutlinePersonOutline } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";

const Sidebar = () => {
    return (
        // <div className="min-h-screen md:flex flex-col w-64 bg-gray-900">
        <div className="min-h-screen md:flex flex-col w-64 border-gray-200 bg-white">
            {/* <div className="flex items-center justify-center h-16 py-10 bg-gray-900"> */}
            <div className="flex items-center justify-center h-16 py-10">
                <Logo />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                {/* <nav className="flex-1 px-2 py-4 bg-gray-900"> */}
                <nav className="flex-1 px-2 py-4">
                    <div className="h-full flex flex-col justify-between">
                        <div>
                            <Link to="/dashboard" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <AiOutlineHome />
                                <span>Dashboard</span>
                            </Link>
                            <hr />
                            <Link to="/dashboard/products" className="flex items-center space-x-1 rounded-md px-2 py-3 mt-1 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlinePreview />
                                <span>All Products</span>
                            </Link>
                            <Link to="/dashboard/add-product" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlineCreate />
                                <span>Create Product</span>
                            </Link>
                            <Link to="/dashboard/products" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlineFavoriteBorder />
                                <span>My Favorites</span>
                            </Link>
                            <Link to="/dashboard/products" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlineShoppingCart />
                                <span>Cart</span>
                            </Link>
                            <Link to="/dashboard/products" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdForwardToInbox />
                                <span>Messages</span>
                            </Link>
                            <Link to="/dashboard/products" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <LiaFileInvoiceSolid />
                                <span>Invoice</span>
                            </Link>
                        </div>
                        <div>
                            <hr />
                            <Link to="/dashboard/profile" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlinePersonOutline />
                                <span>Profile</span>
                            </Link>
                            <Link to="/dashboard" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <PiSignOut />
                                <span>Sign out</span>
                            </Link>
                        </div>
                    </div>

                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
