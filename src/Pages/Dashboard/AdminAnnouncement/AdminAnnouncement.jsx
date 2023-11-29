import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AdminAnnouncement = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    

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
            description: data.description,
            title: data.title,
            image: res.data.data.display_url,
        }
        console.log(postItem);
        const menuRes = await axiosSecure.post('/adminPosts', postItem)
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
    return (
        <div>
            <div className="bg-slate-100 md:p-16">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name*</label>
                                <input type="text" {...register("name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here" required />
                            </div>
                            <div className="w-full mt-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Title*</label>
                                <input type="text" {...register("title")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here" required />
                            </div>
                        <div className="mt-7">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description*</label>
                            <textarea {...register("description")} className="textarea w-full  h-[150px] textarea-bordered" placeholder="Type here...."></textarea>
                        </div>
                        <div className="mt-7">
                            <input type="file" {...register("image")} className=" gap-3 bg-opacity-0 w-full" />
                        </div>

                        <input type="submit" className="btn mt-5  bg-[#5476e6] font-bold text-white" value="Admin post " />

                    </form>
                </div>
        </div>
    );
};

export default AdminAnnouncement;