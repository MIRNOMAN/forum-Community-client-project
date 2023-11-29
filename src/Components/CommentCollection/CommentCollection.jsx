import {  useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Share/Navbar/Container";
import useAuth from "../../hooks/useAuth";
import CommentModal from "../CommentModal/CommentModal";
import { useState } from "react";


const CommentCollection = () => {
    const [feedback, setFeedback] = useState(false)
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { _id } = useParams();
    console.log(_id)


    const { data = [],refetch } = useQuery({
        queryKey: ['comments', _id],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/comments/${_id}?email=${user?.email}`);
            return res.data;
        }
    })
    console.log(data)
   

    const handleChangeValue = async (e) =>{ 
        e.preventDefault();
        const form = e.target.value;
        const res = await axiosPublic.post('/feedback', {form})  
        setFeedback(true);
        refetch();
        console.log(res);
    }
    const handleReporValue = () =>{
        setFeedback(false)
    }
  
    return (
        <div >
            <Container>
                {
                    data.length === 0 ? <div>
                        <div className="text-2xl font-bold min-h-screen flex justify-center items-center"><h1>No Comments</h1></div>
                    </div> : <div className="mt-5">
                        <h1>Totall Comments : {data.length}</h1>
                        <div className="mt-5">
                            <table className="table table-xs w-1/5 md:w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Commenter Email</th>
                                        <th>Comment text</th>
                                        <th> Feedback </th>
                                        <th> Report </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((user, index) =>
                                            <tr key={user._id}> 
                                                <th>{index + 1}</th>
                                                <td>{user.email}</td>
                                                <td>
                                                    {user?.newComments?.length > 20 ? <h2>{user?.newComments.slice(0, 20)}.... </h2> : <p>{user?.newComments}</p>}

                                                    <CommentModal id={user._id} >Read More</CommentModal>
                                                </td>
                                                <td>
                                                 
                                                        <select onChange={handleChangeValue} className="select w-32">
                                                        <option disabled selected>feedback</option>
                                                        <option>Appropriate</option>
                                                        <option>Inappropriate</option>
                                                        <option>Offensive</option>
                                        
                                                      </select>
                                                </td>
                                                <td>{feedback ? <button onClick={() =>handleReporValue(user._id)} className="btn btn-ghost bg-red-500 text-white">Report</button> : <button disabled className="btn btn-ghost bg-red-500 text-white">Report</button>}</td>

                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </Container>

        </div>
    );
};

export default CommentCollection;