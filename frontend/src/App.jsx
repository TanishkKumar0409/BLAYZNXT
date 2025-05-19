import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-advanced-cropper/dist/style.css";

import { Toaster } from 'react-hot-toast';
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Footer/Footer";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import VerifyOTP from "./Pages/Auth/VerifyOtp";
import Storage from "./Pages/Storage/Storage";
import History from "./Pages/History/History";
import FileView from "./Pages/Fileview/FileView";
import Main from "./Pages/Main/Main";
import Protected from "./context/Protected";
import Profile from "./Pages/Profile/Profile";
import AuthNavbar from "./Components/Navigation/AuthNavbar";
import { useCallback, useEffect, useState } from "react";
import { API } from "./context/API";
import UpdateProfile from "./Pages/Profile/UpdateProfile";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Admin from "./Admin/Users/Admin";
import Newsletter from "./Admin/Users/Newsletters";
import ContactQuery from "./Admin/Users/ContactQuery";
import Legals from "./Admin/Legals/Legal";
import ContactQueriesView from "./Admin/Users/ContactQueryView";
import AdminView from "./Admin/Users/ViewAdmin";
import LegalPolicy from "./Pages/Legal/LegalPolicy";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await API.get("/get-token");
        setToken(tokenResponse.data.token);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const FolderAndDatebaseCleaners = useCallback(async () => {
    try {
      await API.get(`/folderCleaner`);
    } catch (error) {
      console.error(error.message);
    }
  });

  useEffect(() => {
    FolderAndDatebaseCleaners();
  }, [FolderAndDatebaseCleaners]);
  return (
    <BrowserRouter>
    <Toaster/>
      {!token ? <Navbar /> : <AuthNavbar />}
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>}/>

        <Route path="/login" element={<Protected><Login /></Protected>}/>
        <Route path="/register" element={<Protected><Register /></Protected>}/>
        <Route path="/verify/:username" element={<Protected><VerifyOTP /></Protected>}/>

        <Route path="/legal/:legal" element={<Protected><LegalPolicy /></Protected>}/>

        <Route path="/main/:username/profile"element={<Protected><Profile /></Protected>}/>
        <Route path="/main/:username/profile/update" element={<Protected><UpdateProfile /></Protected>}/>

        <Route path="/forgot-password" element={<Protected><ForgotPassword /></Protected>}/>
        <Route path="/reset/password/:email" element={<Protected><ResetPassword /></Protected>}/>

        <Route path="/main/:username" element={<Protected><Main /></Protected>}/>
        <Route path="/main/:username/storage" element={<Protected><Storage /></Protected>}/>
        <Route path="/main/:username/history" element={<Protected><History /></Protected>}/>
        <Route path="/main/:username/file/view/:id" element={<Protected><FileView /></Protected>}/>

        <Route path="/about" element={<Protected><About /></Protected>}/>
        <Route path="/contact" element={<Protected><Contact /></Protected>}/>

        <Route path="/main/:username/dashboard/:role" element={<Protected><Admin/></Protected>}/>
        <Route path="/main/:username/dashboard/:role/:name" element={<Protected><AdminView/></Protected>}/>
        <Route path="/main/:username/dashboard/legal/updates" element={<Protected><Legals/></Protected>}/>
        <Route path="/main/:username/dashboard/query/contact" element={<Protected><ContactQuery/></Protected>}/>
        <Route path="/main/:username/dashboard/query/contact/:objectId" element={<Protected><ContactQueriesView/></Protected>}/>
        <Route path="/main/:username/dashboard/query/newsletters" element={<Protected><Newsletter/></Protected>}/>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
