import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaBookmark,  FaHome, FaList, FaShoppingCart, FaStreetView,  FaUtensils } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
   
    return (
        <div className="flex mx-10">
            <div className="w-64 min-h-screen bg-[#8DC643]">
                <ul className="menu p-3">

                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/adminProfile'><FaHome></FaHome> Admin Profile</NavLink></li>
                            <li><NavLink to='/dashboard/reported'><FaList></FaList>Reported Comments</NavLink></li>
                            <li><NavLink to='/dashboard/announcement'><FaAd></FaAd> Make Announcement</NavLink></li>
                            <li><NavLink to='/dashboard/users'><FaAd></FaAd> Manage Users</NavLink></li>
                            
                        </>
                            : <>
                                <li><NavLink to='/dashboard/userprofile'><FaHome></FaHome> My Profile</NavLink></li>
                                <li><NavLink to='/dashboard/addPost'><FaShoppingCart></FaShoppingCart> Add Post </NavLink></li>
                                <li><NavLink to='/dashboard/posts'><FaStreetView></FaStreetView> My Posts</NavLink></li>
                                
                            </>
                    }
                     
                    <div className="divider"></div>
                    <li><NavLink to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <g >
                                <path d="M23.3529 11.6432C23.3524 11.6426 23.3518 11.6421 23.3513 11.6415L13.5612 1.85181C13.1439 1.43433 12.5891 1.20435 11.9989 1.20435C11.4088 1.20435 10.854 1.43414 10.4365 1.85162L0.651514 11.6364C0.648218 11.6397 0.644922 11.6432 0.641626 11.6465C-0.215307 12.5084 -0.213843 13.9067 0.645838 14.7664C1.0386 15.1594 1.55734 15.387 2.11196 15.4108C2.13449 15.413 2.15719 15.4141 2.18008 15.4141H2.57028V22.6187C2.57028 24.0444 3.73025 25.2043 5.15627 25.2043H8.98647C9.37466 25.2043 9.6896 24.8896 9.6896 24.5012V18.8528C9.6896 18.2022 10.2188 17.673 10.8693 17.673H13.1285C13.7791 17.673 14.3083 18.2022 14.3083 18.8528V24.5012C14.3083 24.8896 14.623 25.2043 15.0114 25.2043H18.8416C20.2676 25.2043 21.4276 24.0444 21.4276 22.6187V15.4141H21.7894C22.3794 15.4141 22.9342 15.1843 23.3518 14.7668C24.2124 13.9056 24.2128 12.5049 23.3529 11.6432Z" fill="#151515" />
                            </g>
                            <defs>
                                <clipPath id="clip0_42_579">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.699463)" />
                                </clipPath>
                            </defs>
                        </svg>
                        Home
                    </NavLink></li>
                </ul>

            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;