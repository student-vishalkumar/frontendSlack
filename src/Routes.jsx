import { Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { SignupContainer } from "./components/organisms/Auth/SignupContainer";
import { SigninContainer } from "./components/organisms/Auth/SigninContainer";
import { Notfound } from "./pages/Notfound/Notfound";
import { ProtectedRoute } from "./components/molecules/ProtectedRoute/ProtectedRoute";
import { Home } from "./pages/Home/Home";
import { WorkspaceLayout } from "./pages/Workspace/Layout";
import { JoinPage } from "./pages/Workspace/JoinPage";
import { Channel } from "./pages/Workspace/Channel";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/signup" element={<Auth><SignupContainer /></Auth>}/>
      <Route path="/auth/signin" element={<Auth><SigninContainer /></Auth>}/>
      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/workspaces/:workspaceId"
      element={<ProtectedRoute><WorkspaceLayout>workspace</WorkspaceLayout></ProtectedRoute>}/>
      <Route path="/workspaces/:workspaceId/channels/:channelId"
      element={<ProtectedRoute><WorkspaceLayout><Channel/></WorkspaceLayout></ProtectedRoute>}/>
      <Route path="/workspaces/join/:workspaceId" element={<JoinPage/>}/>
      <Route path="/*" element={<Notfound />}/>
    </Routes>
  );
};


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAhfFqTMbb5X654N2aYV11iRaZGUN9si9g",
//   authDomain: "imageuploadinslackapp.firebaseapp.com",
//   projectId: "imageuploadinslackapp",
//   storageBucket: "imageuploadinslackapp.firebasestorage.app",
//   messagingSenderId: "387700993602",
//   appId: "1:387700993602:web:5bcbdb3f718a82fd97c7db",
//   measurementId: "G-W072CPZ599"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);