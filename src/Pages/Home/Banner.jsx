import Container from "../../Share/Navbar/Container";
import image1 from "../../assets/banner/94e66f_e748a6157aa84c24a309d318175d06d8~mv2.gif"
import image2 from "../../assets/banner/94e66f_fc8b33b4fd644bdfa335a123883321d6~mv2.gif"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

const Banner = ({setSearch}) => {
 
   
    // const axiosSecure = useAxiosSecure();

    // useEffect(() => {
    //  if(search){
    //     console.log(search);
    //     axiosSecure.get(`/postsearch?search=${search}`)
    //     .then(res => setSearchValue(res.data))
    //  }
    // },[search])
    

    const handleSearch = (e) =>{
      e.preventDefault();

      const searchText = e.target.search.value;

      setSearch(searchText)
    

    }

    return (
        <div className="md:hero md:min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/D4GY52J/Untitled-design-21-1.png)' }}>
            <Container>
                <div className="md:flex gap-5 mt-10 justify-center items-center ">
                    <div className="md:w-1/2" data-aos="fade-right"
                        data-aos-duration="3000">
                        <h1 className="mb-5 text-5xl font-bold text-white Playfair">Civilized discussion for your community</h1>
                        <p className="mb-5 text-white">Join our vibrant online community dedicated to fostering meaningful discussions, sharing knowledge, and connecting with like-minded individuals. </p>
                        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Explore More</button>

                    </div>
                    <div className="md:w-1/2 w-full">
                        <div className="">
                            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                                <SwiperSlide>
                                    <img className=" rounded-lg" src={image1} alt="" />
                                    <div className="-mt-48 text-white p-5 text-center">
                                        <h1 className="text-xl font-bold">   Join Groups</h1>
                                        <p className="mt-4 font-medium">Explore your groups below to see what you can do, or head to Settings to start managing your Categories. </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className="rounded-lg" src={image2} alt="" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSearch} className="md:mt-20 pb-5">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" name="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Category...." />
                            <input  type="submit" value="Search" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" ></input>
                        </div>
                    </form>
                </div>
            </Container>

        </div>
    );
};

export default Banner;