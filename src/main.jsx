import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom/client";
import { persistor, store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardHome from "./components/Dashboard/DashboardHome";
import ProjectsLists from "./components/Dashboard/ProjectsLists";
import Login from "./components/Login";
import MembersList from "./components/Dashboard/MembersList";
import LoginFailed from "./components/Error/LoginFailed";
import NotFound from "./components/Error/404Page";
import { Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import MySpin from "./components/Dashboard/MySpin";
import "./index.css";
import "./App.css";
import ProjectDashboard from "./components/Project/ProjectDashboard";
import ErrorPage from "./components/Error/ErrorPage";
import Profile from "./components/Dashboard/Profile";
import ProjectTasks from "./components/Project/ProjectTasks";
import MemberTasks from "./components/Dashboard/MemberTasks";
import ProjectMembers from "./components/Project/ProjectMembers";
import Dnd from "./components/dnd-test";
import Checkrole from "./components/CheckrRole";
import MemberProjectDash from "./components/Project/MemberProjectDash";
import MemberProfile from "./components/UI/MemberProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/checkrole",
    element: <Checkrole />,
    errorElement: <LoginFailed />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "", // empty path to redirect to "/dashboard/home"
        element: <Navigate to="home" replace={true} />,
      },
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "ProjectsLists",
        element: <ProjectsLists />,
      },
      {
        path: "members",
        element: <MembersList />,
      },
      {
        path: "myprojects",
        element: <ProjectsLists />,
      },
      {
        path: "MyTasks/ToDo",
        element: <MemberTasks />,
      },
      {
        path: "MyTasks/InProgress",
        element: <MemberTasks />,
      },
      {
        path: "MyTasks/Completed",
        element: <MemberTasks />,
      },
      {
        path: "MyTasks/Failed",
        element: <MemberTasks />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/MemberProfile",
    element: <MemberProfile />,
  },
  {
    path: "UserProjectDashboard",
    element: <MemberProjectDash />,
  },
  {
    path: "/dashboard/profile",
    element: <Profile />,
  },
  {
    path: "/dnd",
    element: <Dnd />,
  },
  {
    path: "/ProjectDashboard",
    element: <ProjectDashboard />,
    children: [
      {
        path: "",
        element: <Navigate to="home" replace={true} />,
      },
      {
        path: "home",
        element: <ProjectTasks />,
      },
      {
        path: "members",
        element: <ProjectMembers />,
      },
    ],
  },
  {
    path: "/loginfailed",
    element: <LoginFailed />,
    errorElement: <NotFound />,
    // element: isLoggedIn ? <DashBoard /> : <LoginFailed />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<MySpin />} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
