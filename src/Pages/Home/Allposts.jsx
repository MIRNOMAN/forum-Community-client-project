
import AllPostCard from "./AllPostCard";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import './Allposts.css'
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Allposts = ({search}) => {
    const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [asc, setAsc] = useState(true)
    const {count} = useLoaderData();
    const numberOfPages = Math.ceil(count / itemPerPage)
    const pages = [...Array(numberOfPages).keys()];
    const axiosSecure = useAxiosSecure();
    // useEffect(() =>{
    //     axios.get(`https://forum-community-server-project.vercel.app/posts?page=${currentPage}&size=${itemPerPage}&sort=${asc ? 'asc' : 'desc'}`)
    //     .then(res => {
    //         setPosts(res.data)
    //         // const remaining = posts?.filter(cof => cof._id !== posts._id)
    //         //  setPosts(remaining)
    //     })
        
    // },[currentPage, itemPerPage,asc,posts])

    const {data: posts =[], isLoading,isError,error } = useQuery({
        queryKey: ['posts',currentPage,itemPerPage,asc,search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?page=${currentPage}&size=${itemPerPage}&sort=${asc ? 'asc' : 'desc'}&search=${search}`);
            return res.data;
        }
    })
   
    console.log(posts);
    const handleItemPerPage = (e) => {
    const value = parseInt(e.target.value)
    setItemPerPage(value)
    setCurrentPage(0)
    }
    const habdlePrevPage =() =>{
        if(currentPage > 0){
          setCurrentPage(currentPage - 1)
        }
    }
    
    const handlenextPage = () =>{
        if(currentPage < pages.length){
            setCurrentPage(currentPage + 1)
        }
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (isError) {
        return <p>something wrong : {error}</p>
    }
    return (
        
        <div>
            <SectionTitle heading={'post section'} subHeading={'all user posts'}></SectionTitle>
             <button onClick={() => setAsc(!asc)} className="btn mb-6 btn-accent text-white text-lg">Popularity</button>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {
               isLoading ? <p>Loading...</p> : posts.map((post) => <AllPostCard key={post._id}  post={post}></AllPostCard>)
            }
           </div>
          <div className="pagination">
            <button onClick={habdlePrevPage}> prev</button>
             {  isLoading ? <p>Loading...</p> :
                pages.map((page) => <button 
                className={currentPage === page ? 'selected' : undefined}
                key={page}
                onClick={() => setCurrentPage(page)}
                >{page}</button>)
             }
              <button onClick={handlenextPage}>next</button>
             <select name={itemPerPage} className="p-2 py-4 bg-[#ACC8E5] rounded-md" onChange={handleItemPerPage} id="">
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="20">20</option>
               <option value="50">50</option>
             </select>
          </div>
        </div>
    );
};

export default Allposts;
