import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import Browse from './Components/Browse'
import Profile from './Components/Profile'
import JobDescription from './Components/JobDescription'
import Companies from './Components/Admin/Companies'
import CompanyCreate from './Components/Admin/CompanyCreate'
import CompanySetup from './Components/Admin/CompanySetup'
import AdminJobs from "./Components/Admin/AdminJobs";
import PostJob from './Components/Admin/PostJob'
import Applicants from './Components/Admin/Applicants'
import ProtectedRoute from './Components/Admin/ProtectedRoute'
import { Provider } from 'react-redux'
import store from './redux/store'


const appRouter = createBrowserRouter([ 
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },


  
 // for admin
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute> 
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute> 
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute> 
  },
]);

function App() {
  return (
    <Provider store={store}>  {/* Wrap with Provider to pass the redux store */}
      <RouterProvider router={appRouter} /> 
    </Provider>
  );
}

export default App;
