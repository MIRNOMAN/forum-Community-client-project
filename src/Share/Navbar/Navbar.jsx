import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import logo from "../../assets/logo.png"
import useAuth from "../../hooks/useAuth";
import useAnnouncement from "../../hooks/useAnnouncement";
import { GrAnnounce } from "react-icons/gr";


const Navbar = () => {
    const { user,logOut } = useAuth();
    const [announcementData] = useAnnouncement();

    const handleLogedOut = () => {
        logOut()
          .then(() => { })
          .catch(error => console.log(error));
      }
    const navlinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/membership">Membership</NavLink></li>
        {/* <li><NavLink to="/joinus">Join US</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li> */}
        {user ? <li></li> : <li><NavLink to="/login">Join US</NavLink></li>}
    </>
    return (
        <Container>
            <div className="navbar  bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlinks}
                        </ul>
                    </div>
                    <div className="flex justify-center items-center">
                        <img className="h-20 w-24" src={logo} alt="" />
                        <h1 className="text-xl font-semibold"><span className="text-[#FEB513]">Online</span> <span className="text-[#8DC643]">Forum </span> <br /> <span className="text-blue-400">Community</span></h1>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end ">
                    <div className="flex justify-center items-center">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                 <GrAnnounce className="text-3xl" />
                                    <span className="badge badge-sm indicator-item">+{announcementData.length}</span>
                                </div>
                            </label>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm text-center space-y-2 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    {user?.displayName}
                                </li>
                                {user && <Link to="/dashboard/userprofile"><li><button>Dashboard</button></li></Link>}
                                {
                                    user ?  <li><button onClick={handleLogedOut}>LogOut</button></li> :
                                        <li><Link to='/login'>Login</Link></li> 
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Navbar;