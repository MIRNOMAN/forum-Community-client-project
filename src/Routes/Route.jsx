import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register"
import ViewCard from "../Components/ViewCard/ViewCard";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import UserAddPost from "../Pages/Dashboard/UserAddPost/UserAddPost";
import UserPosts from "../Pages/Dashboard/UserPosts/UserPosts";
import PrivateRoute from "./PrivateRoute";
import Membership from "../Pages/Membership/Membership";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import CommentCollection from "../Components/CommentCollection/CommentCollection";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import AdminAnnouncement from "../Pages/Dashboard/AdminAnnouncement/AdminAnnouncement";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/postsCount')
      },
      {
        path: '/details/:_id',
        element: <ViewCard></ViewCard>,
        loader: ({ params }) => fetch(`http://localhost:5000/details/${params._id}`)
      },
      {
        path: '/membership',
        element: <PrivateRoute><Membership></Membership></PrivateRoute>
      },
      {
        path: '/comments/:_id',
        element: <CommentCollection></CommentCollection>,
        loader: ({ params }) => fetch(`http://localhost:5000/comments/${params._id}`)
      }
      
    ]
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'userprofile',
        element: <UserProfile></UserProfile>
      },
      {
        path: 'addPost',
        element: <UserAddPost></UserAddPost>
      },
      {
        path: 'posts',
        element: <UserPosts></UserPosts>
      },
      // admin
      {
        path: 'adminProfile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      },{
        path: 'announcement',
        element: <AdminAnnouncement></AdminAnnouncement>
      }
    ]
  }
]);

export default router;