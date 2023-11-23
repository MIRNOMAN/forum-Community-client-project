import Lottie from "lottie-react";
import errorPage from "../../../public/errorPage.json"

const ErrorPage = () => {
    return (
        <div>
            <Lottie className="h-screen" animationData={errorPage}></Lottie>
        </div>
    );
};

export default ErrorPage;