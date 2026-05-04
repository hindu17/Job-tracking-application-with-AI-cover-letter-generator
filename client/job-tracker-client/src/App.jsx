// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import AddJob from "./pages/AddJob";
// import AIGenerator from "./pages/AIGenerator";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import PrivateRoute from "./components/PrivateRoute";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import "./styles.css";

// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <BrowserRouter>
//       <div className="app">
        
//         {/* ✅ Show Sidebar only when logged in */}
//         {token && <Sidebar />}

//         <div className="main">
          
//           {/* ✅ Show Navbar only when logged in */}
//           {token && <Navbar />}

//           <Routes>

//             {/* 🔓 PUBLIC ROUTES */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* 🔒 PROTECTED ROUTES */}
//             <Route path="/" element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             } />

//             <Route path="/add" element={
//               <PrivateRoute>
//                 <AddJob />
//               </PrivateRoute>
//             } />

//             <Route path="/ai" element={
//               <PrivateRoute>
//                 <AIGenerator />
//               </PrivateRoute>
//             } />

//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import AIGenerator from "./pages/AIGenerator";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles.css";

function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ✅ PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ PRIVATE ROUTES */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <Layout>
                <AddJob />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <PrivateRoute>
              <Layout>
                <AIGenerator />
              </Layout>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;