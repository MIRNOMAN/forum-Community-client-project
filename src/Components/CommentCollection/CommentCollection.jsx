import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Share/Navbar/Container";


const CommentCollection = () => {
    const axiosPublic = useAxiosPublic();
    const { _id } = useParams();
    console.log(_id)
  

    const { data = {}, reftch } = useQuery({
        queryKey: ['comments', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/comments/${_id}`)
            return res.data;
        }
    })
    console.log(data)
    return (
        <div >
            <Container>
                <div className="p-10">
                    <h1>Data : {data.length}</h1>
                </div>
            </Container>

        </div>
    );
};

export default CommentCollection;