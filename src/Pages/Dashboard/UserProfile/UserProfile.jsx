import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaAward } from "react-icons/fa";


const UserProfile = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [userData, setUserData] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    useEffect(() => {
         axiosPublic.get('/users')
         .then(res => {
            setUserData(res.data)
         });
console.log()
    },[axiosPublic])
    console.log(userData)

    useEffect(() =>{
        axiosPublic.get('/posts')
        .then(res => {
            setRecentPosts(res.data.slice(0,3));
        })
    },[axiosPublic])
    console.log(recentPosts)
    return (
       <div>
        {userData && <div>
            <div className="bg-[#F2F2F2] md:p-7 md:min-h-screen">
            <div className="text-center">
                <h1 className="md:text-4xl font-extrabold Playfair">User profile</h1>
                <hr className="md:w-48 h-1 mx-auto my-4  bg-gray-100 border-0 rounded md:my-3 dark:bg-gray-700" />
            </div>

            <div className="md:mt-10">
                <div className="bg-[#FFFFFF] md:mx-10 md:h-[200px] h-[100px] md:pt-[60px] rounded-xl relative ">
                    <h1 className="md:text-2xl text-center md:font-bold Playfair">{user?.displayName}</h1>
                    <h6 className="md:text-lg text-xs text-center text-[#DFE0E2] ">{user?.email}</h6>
                    <h1 className="flex md:text-2xl justify-center items-center font-semibold">Badges : <span className="flex ml-4 items-center md:text-xl">Bronze <FaAward></FaAward></span></h1>
                    <h1 className="flex md:text-2xl justify-center items-center font-semibold">Badges : <span className="flex ml-4 items-center md:text-xl">Gold <FaAward></FaAward></span></h1>
                </div>
                <div className="">
                    <img className="rounded-full h-16 w-16  md:h-24 md:w-24 md:top-[120px] border-8 border-[#F2F2F2] md:ml-[27%] ml-[37%] absolute" src={user?.photoURL} alt="" />
                </div>
            </div>
            <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
                {recentPosts?.map(item => 
                    <div key={item._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-20 h-20 mb-3 mt-7 rounded-full shadow-lg" src={item.image} alt="Bonnie image" />
                        <h5 className="mb-1 text-base font-bold text-gray-900 text-center dark:text-white">{item.title}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.tagName}</span>
                        <div className=" mt-4 text-center md:mt-4">
                            <p className="text-xs">{item.time}</p>
                            <div className="flex gap-8 mt-2 text-sm">
                                <p>Vote : <span className="font-bold ml-2" >{item.votes}</span></p>
                                <p>comments : <span className="font-bold ml-2">{ item.comments}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                    
                    )}
            </div>
        </div>
            
            </div>}
       </div>
    );
};

export default UserProfile;