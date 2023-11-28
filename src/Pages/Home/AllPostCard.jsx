import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const AllPostCard = ({ post }) => {
    const [comments, setComments] = useState([])
    const axiosPublic = useAxiosPublic();
    const { _id,author_email, image, title, time, tagName, votes } = post;
   
    useEffect(() => {
        axiosPublic.get('/commentsCount')
        .then(res => {
            setComments(res.data.result);
        })
    },[axiosPublic])
   console.log(comments)
    return (
        <div>
            <Link to={`/details/${_id}`}>
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 mt-7 rounded-full shadow-lg" src={image} alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-bold text-gray-900 text-center dark:text-white">{title}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{tagName}</span>
                        <div className=" mt-4 text-center md:mt-4">
                            <p>{time}</p>
                            <div className="flex gap-8 mt-2 text-sm">
                                <p>Vote : <span className="font-bold ml-2" >{votes}</span></p>
                                <p>comments : <span className="font-bold ml-2">{comments }</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>




        </div>
    );
};

export default AllPostCard;