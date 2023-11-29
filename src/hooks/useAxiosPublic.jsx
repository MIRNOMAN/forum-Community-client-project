import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://forum-community-server-project.vercel.app',

})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;