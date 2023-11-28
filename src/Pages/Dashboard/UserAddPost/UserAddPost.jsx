import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";




const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UserAddPost = () => {
    const [tagss, setTagss] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();
    


    useEffect(() => {
        fetch('/tags.json')
            .then(res => res.json())
            .then(data => setTagss(data))
    }, [])

    console.log(tagss)

    const onSubmit = async (data) => {
        console.log(data)

        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })
        console.log(res.data);
        if (res.data.success) {
            const postItem = {
                author_name: data.name,
                author_email: data.email,
                tagName: data.tagCatagory,
                title: data.title,
                description: data.description,
                image: res.data.data.display_url,
                upVotes: 0,
                downVotes: 0,
                time: new Date().getTime(),
                votes: 0,
                comments: 0,
            }
            console.log(postItem);
            const menuRes = await axiosSecure.post('/posts', postItem)
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} item added successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    const handleAddPost = () => {
        setPostCount((prevCount) => prevCount + 1);
    }
    const handleBecomeMember = () =>{
        navigate('/membership')   
    }
    console.log(postCount);
    return (
        <div>
            {postCount <= 5 ? (
                <div className="bg-slate-100 p-16">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="md:flex">
                            <div className="w-1/2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name*</label>
                                <input type="text" {...register("name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here" required />
                            </div>
                            <div className="w-1/2 ml-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Email*</label>
                                <input type="email" {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here" required />
                            </div>
                        </div>
                        <div className="md:flex mt-7">
                            <div className="w-1/2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag*</label>
                                <select {...register("tagCatagory")} className="select select-bordered w-full ">
                                    <option disabled selected>Select a tag</option>
                                    {
                                        tagss?.map(tags =>
                                            <option key={tags.tagName}  >{tags.tagName}</option>
                                        )
                                    }

                                </select>
                            </div>
                            <div className="w-1/2 ml-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title*</label>
                                <input type="text" {...register("title")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here.." required />
                            </div>

                        </div>
                        <div className="mt-7">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description*</label>
                            <textarea {...register("description")} className="textarea w-full  h-[150px] textarea-bordered" placeholder="Type here...."></textarea>
                        </div>
                        <div className="mt-7">
                            <input type="file" {...register("image")} className=" gap-3 bg-opacity-0 w-full" />
                        </div>

                        <input onClick={handleAddPost} type="submit" className="btn mt-5  bg-[#5476e6] font-bold text-white" value="Add Post " />

                    </form>
                </div>
            )
                : (
                    <div>
                        <p>You have reached the maximum post limit.</p>
                        <button type="button" className="btn" onClick={handleBecomeMember}>
                            Become a Member
                        </button>
                    </div>
                )}
        </div>

    );
};

export default UserAddPost;