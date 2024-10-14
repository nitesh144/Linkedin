import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/auth/SignUpPage"
import LoginPage from "./pages/auth/LoginPage"
import toast, { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./lib/axios"
import NotificationPage from "./pages/NotificationPage"
import NetworkPage from "./pages/NetworkPage"
import PostPage from "./pages/PostPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  //useQuery to fetch the data
  const { data: authUser, isLoading} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    }
  });
  //when we want to go to signup page without authenticated it shows the signup page for 1 sec
  //to handle this we use this code
  if(isLoading) return null;

  return (

    //will always have navbar in the top so everything wrapped inside layout
    <Layout >
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'}/>} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={'/'}/>} />
        <Route path='/notifications' element={!authUser ? <NotificationPage /> : <Navigate to={'/login'}/>} />
        <Route path='/network' element={!authUser ? <NetworkPage /> : <Navigate to={'/login'}/>} />
        <Route path='/post/:postId' element={authUser ? <PostPage /> : <Navigate to={"/login"} />} />
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster />
    </Layout>
  )
}

export default App
