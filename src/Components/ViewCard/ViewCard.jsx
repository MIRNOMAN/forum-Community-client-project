
import Container from "../../Share/Navbar/Container";
import { FaArrowUp,FaShare, FaArrowDown } from 'react-icons/fa';
import {
 FacebookShareButton
} from "react-share";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams, } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";





const ViewCard = () => {

 const axiosPublic = useAxiosPublic();
 const {_id} = useParams();



const {data = {}, refetch,isFetching } = useQuery({
    queryKey: ['details', _id],
    queryFn: async () => {
        const res = await axiosPublic.get(`/details/${_id}`)
 
        return res.data;
    }
})
   console.log(data);
    const { author_name,author_email, image, title,votes, time, tagName, description } = data;

    const handleComment = async(e) =>{
        e.preventDefault();
        const comment = e.target.textArea.value;

        const commentInfo = {
            newComments: comment,
            email : author_email,
        }
       
      const res = await axiosPublic.post('/comments', commentInfo)
      
        
    
    }
    
    
   const handleUpvotes = () =>{
  
    const latestVote = data.votes + 1
     axiosPublic.patch('/posts', {latestVote, userId: _id})
     .then(res => {
        refetch();
     })
 
    
   }
   const handleDownVotes = () =>{

    const latestVote = data.votes - 1
    axiosPublic.patch('/posts', {latestVote, userId: _id})
    .then(res => {
        refetch();
     })

   
   }

    return (
        <div className="flex mx-auto" >
            <Container>
                <div className="bg-[#F9F9F9] md:h-[550px] md:w-[800px] p-12 mt-6 mb-6 rounded-xl shadow-lg">
                    <div className="flex gap-4 items-center">
                        <img className="h-16 w-16 rounded-full" src={image} alt="" />
                        <h2 className="text-2xl">{author_name}</h2>
                    </div>
                    <hr className="mt-3" />
                    <div className="mt-4">
                        <h1 className="text-xl font-semibold">{title}</h1>
                        <p className="text-sm mt-2 text-[#706F6F]">{description}</p>
                        <div className="flex mt-5 space-x-16">
                            <p className="text-sm mt-2 text-[#706F6F]">{tagName}</p>
                            <p className="text-sm mt-2 text-[#706F6F]">{time}</p>
                        </div>
                        <p className="text-sm mt-2 text-[#706F6F]">vote: {votes}</p>
                        <hr className="mt-5" />
                        <form onSubmit={handleComment}>
                        <textarea className="textarea w-full" name="textArea" placeholder="Comment here....."></textarea>
                        <input type="submit" className="btn btn-sm w-full mt-1" value="Add Comment" />
                        </form>
                        <div className="mt-5 space-x-9">
                            <button onClick={handleUpvotes} className="btn btn-circle"><FaArrowUp></FaArrowUp></button>
                            <button onClick={handleDownVotes} className="btn btn-circle"><FaArrowDown></FaArrowDown></button>
                            <FacebookShareButton url={`http://localhost:5000/details/${_id}`}>
                            <button className="btn btn-circle"><FaShare></FaShare></button>
                            </FacebookShareButton>
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default ViewCard;