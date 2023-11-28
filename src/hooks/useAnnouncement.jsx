import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAnnouncement = () => {
    const axiosPublic = useAxiosPublic();
    
   const {data: announcementData=[],refetch} = useQuery({
    queryKey: ['posts'],
    queryFn : async () =>{
        const res = await axiosPublic.get('/adminPosts')
        return res.data;
    }
   })
   return  [announcementData,refetch]
};

export default useAnnouncement;