import { Link} from "react-router-dom";




const AllPostCard = ({ post }) => {
 
    const { _id,comments, image, title, time, tagName, votes } = post ;
   
   
    return (
        <div>
            <Link to={`/details/${_id}`}>
                <div className="w-full h-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 mt-7 rounded-full shadow-lg" src={image} alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-bold text-gray-900 text-center dark:text-white">{title}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400"> {tagName}</span>
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