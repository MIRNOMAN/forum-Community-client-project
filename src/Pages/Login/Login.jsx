import Lottie from "lottie-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import lottieLoginAnimation from "../../../public/AnimationLogin.json"
import {loadCaptchaEnginge, LoadCanvasTemplate,validateCaptcha } from "react-simple-captcha";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect } from "react";
import Swal from "sweetalert2";


const Login = () => {
const [ disabled, setDisabled] = useState(true);
const {signIn,googleSignIn} = useAuth();
const navigate = useNavigate();
const location = useLocation();
const axiosPublic = useAxiosPublic();

const from = location.state?.from?.pathname || "/";
   useEffect(() => {
    loadCaptchaEnginge(6); 
   },[])

     const handleLogin = (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            Swal.fire({
                title: "User Login successfully",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
            
              navigate(from, { replace: true });
        })
     }


     const handleValidate = (e) =>{
      const user_captcha_value = e.target.value;
      if(validateCaptcha(user_captcha_value)){
        setDisabled(false);
      }else{
       setDisabled(true);
      }

     }

     const handleGoogleLogin = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result);
           const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
           }
           axiosPublic.post('/users', userInfo)
           .then(result => {
            console.log(result);
            navigate('/')
           })
        })
     }
    return (
        <div>
           <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content  md:flex">
                    <div className=" w-1/2 ">
                        <Lottie animationData={lottieLoginAnimation}></Lottie>

                    </div>
                    <div className="w-1/2  ">
                        <h1 className="text-3xl text-center font-bold">Sign in to your account</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <LoadCanvasTemplate />
                                </label>
                                <input type="text" onBlur={handleValidate} name="Captcha" placeholder="type the captcha above" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={disabled} className="btn btn-active btn-accent">Login</button>
                            </div>
                        </form>
                        <p className="text-center">Don’t have an account yet? <Link to="/register" className="text-blue-700">Sign up</Link></p>
                        <div className="mt-5 flex justify-center gap-24">
                            <button onClick={handleGoogleLogin} className="btn btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                            </button>
                            <button className="btn btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16" id="github"><path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;