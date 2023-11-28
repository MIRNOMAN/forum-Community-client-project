import { useQuery } from "@tanstack/react-query";
import  useAxiosPublic from "./useAxiosPublic"

const usePosts = () => {
    const axiosPublic = useAxiosPublic();
    
   const {data: dataposts=[],refetch, isPending: postPanding} = useQuery({
    queryKey: ['posts'],
    queryFn : async () =>{
        const res = await axiosPublic.get('/posts')
        return res.data;
    }
   })
   return  [dataposts,refetch,postPanding]
};

export default usePosts;