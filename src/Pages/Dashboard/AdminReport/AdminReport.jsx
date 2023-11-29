import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const AdminReport = () => {
    const {user} = useAuth();
    const emailName = user.email;
    const axiosSecure = useAxiosSecure();
    const { data: feedbackData = [] } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedback')
            return res.data;
        }
    })
    console.log(feedbackData)
    return (
        <div>
            <div className="mt-5">
                <h1>Totall Comments : {feedbackData.length}</h1>
                <div className="mt-5">
                    <table className="table table-xs  text-center md:w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Admin Email</th>
                                <th>Feedback</th>
                                <th>Take Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                feedbackData.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{emailName}</td>
                                        <td>
                                            {user.form}
                                        </td>

                                        <td>
                                            <div role="alert" className="alert alert-warning">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                <span>Warning: A written warning to the reported user!</span>
                                            </div>
                                        </td>

                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminReport;