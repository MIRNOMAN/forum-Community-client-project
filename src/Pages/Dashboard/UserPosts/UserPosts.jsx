import { FaComment, FaTrashAlt } from "react-icons/fa";
import usePosts from "../../../hooks/usePosts";
import { Link, } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";



const UserPosts = () => {
    const [dataposts,refetch] = usePosts();
    const axiosPublic = useAxiosPublic();


    const handleDelete = (user) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/posts/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
   
    return (
        <div>
            <h1>totall user : {dataposts.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-xs   md:w-full">
                    {/* head */}
                    <thead>
                        <tr >
                            <th></th>
                            <th>Post Title</th>
                            <th>Number of votes</th>
                            <th> Comment </th>
                            <th> Delete </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataposts.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.title}</td>
                                    <td>{user.votes}</td>
                                    <td> <Link to={`/comments/${user._id}`}><button className="btn btn-ghost bg-[#8DC643] text-white"><FaComment></FaComment></button></Link></td>
                                    <td><button onClick={() => handleDelete(user)}  className="btn btn-ghost bg-red-500 text-white"><FaTrashAlt></FaTrashAlt></button></td>
                                    
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPosts;