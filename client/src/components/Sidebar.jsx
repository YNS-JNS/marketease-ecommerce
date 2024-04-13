import { Link } from "react-router-dom";
// import Logo from "./logo";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineShoppingCart, MdOutlineCreate, MdOutlinePreview, MdForwardToInbox, MdOutlinePersonOutline } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { signOutUserStart, deleteUserFailure, deleteUserSuccess } from '../redux/user/userSlice';
const Sidebar = () => {

    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            // dispatch(deleteUserFailure(data.message));
            dispatch(deleteUserFailure(error.message));
        }
    };

    return (
        <div className="h-full md:flex flex-col w-64 border-gray-200 bg-white">
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4">
                    <div className="h-full flex flex-col justify-between">
                        <div>
                            <Link to="/dashboard/statistics" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <AiOutlineHome />
                                <span>Dashboard</span>
                            </Link>
                            <hr />
                            <Link to="/dashboard/all-listings" className="flex items-center space-x-1 rounded-md px-2 py-3 mt-1 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlinePreview />
                                <span>Listing</span>
                            </Link>
                            <Link to="/dashboard/create-listing" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlineCreate />
                                <span>Create listing</span>
                            </Link>
                            <Link to="/dashboard/favorites" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlineFavoriteBorder />
                                <span>My Favorites</span>
                            </Link>
                            <Link to="/dashboard/cart" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdOutlineShoppingCart />
                                <span>Cart</span>
                            </Link>
                            <Link to="/dashboard/messages" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <MdForwardToInbox />
                                <span>Messages</span>
                            </Link>
                            <Link to="/dashboard/invoice" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
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
                            <Link to="/" className="flex items-center space-x-1 rounded-md px-2 py-3 text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                                <PiSignOut />
                                <span onClick={handleSignOut}>
                                    Sign out
                                </span>
                            </Link>
                        </div>
                    </div>

                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
