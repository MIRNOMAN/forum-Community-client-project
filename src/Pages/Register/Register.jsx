import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit,reset, formState: { errors }, } = useForm();
     const {createUser,updateUserProfile,googleSignIn} = useAuth();
     const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data?.name, data?.photo)
            .then(() =>{
                const userInfo = {
                    name : data?.name,
                    email: data?.email,

                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                   if(res.data.insertedId){
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "user profile created successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/login');
                   }
                })
               
            })
            .catch(err =>console.log(err));
        })
    }
    const handleGoogleLogin = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
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
                <title>Forum Community | Register</title>
            </Helmet>
            <div className=" min-h-screen pt-12 bg-base-200">
                <div className="w-3/5 mx-auto">
                    <div className="">
                        <h1 className="text-3xl text-center font-bold">Sign Up to your account</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500 mt-1">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photo", { required: true })} name="photo" placeholder="photo URL" className="input input-bordered" />
                                {errors.photo && <span className="text-red-500 mt-1">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500 mt-1">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                     required: true, 
                                     minLength: 6, 
                                     maxLength: 20 ,
                                     pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                     })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (<p className="text-red-500 mt-1">Password is required</p>)}
                                {errors.password?.type === "minLength" && (<p className="text-red-500 mt-1">Password must be 6 characters </p>)}
                                {errors.password?.type === "pattern" && (<p className="text-red-500 mt-1">Password must be one upperCase and one lower case and one number and one special character  </p>)}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-active btn-accent" type="submit" value="Register" />
                            </div>
                        </form>
                        <p className="text-center">Already have an account?  <Link to="/login" className="text-blue-700">Sign In</Link></p>
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

export default Register;