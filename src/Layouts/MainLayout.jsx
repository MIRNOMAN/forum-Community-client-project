import { Outlet } from "react-router-dom";
import Navbar from "../Share/Navbar/Navbar";
import Footer from "../Share/Footer/Footer";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;