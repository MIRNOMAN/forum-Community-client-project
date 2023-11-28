import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Legend } from "recharts";
import { PieChart, Pie, Cell, } from 'recharts';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: chartData = [], } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })


    const usersall = chartData.users;
    const posts = chartData.allposts;
    const allcomments = chartData.comments;

    const data = [
        { name: 'users', value: (usersall) },
        { name: 'allposts', value: (posts) },
        { name: 'comments', value: (allcomments) },

    ];


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className=" bg-slate-50 md:p-16 rounded-lg">
            <div className="md:flex items-center gap-4">
                <div className="md:w-2/6">
                    <img className="h-[150px] w-[150px] border-8 border-white rounded-full" src={user.photoURL} alt="" />
                </div>
                <div className="md:w-2/6">
                    <h2 className="text-2xl">
                        {
                            user?.displayName ? user.displayName : 'Back'
                        }
                    </h2>
                    <h1 className="py-3 text-blue-500 text-lg">{user.email}</h1>

                </div>
            </div>
            <hr className="mt-5" />

            <div>
                <div>

                    <div className="mt-8 md:flex items-center gap-8">
                        <div className="md:w-1/2">
                            <h1 className="  text-lg">Number of Posts : {usersall}</h1>
                            <h1 className=" py-2 text-lg">Number of Comments : {posts}</h1>
                            <h1 className=" text-lg">Number of Users : {allcomments}</h1>
                        </div>
                        <div className="md:w-1/2">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={130}
                                    fill="#8884d8"
                                    dataKey="value"

                                >
                                    {data?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend ></Legend>
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminProfile;