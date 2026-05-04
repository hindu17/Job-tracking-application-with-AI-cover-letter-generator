// import { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await API.post("/auth/login", form);

//       localStorage.setItem("token", res.data.token);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="form-card">
//       <h2>Login</h2>
// <p>
//   Don't have an account?{" "}
//   <span
//     style={{ color: "blue", cursor: "pointer" }}
//     onClick={() => navigate("/register")}
//   >
//     Register
//   </span>
// </p>
//       <input
//         placeholder="Email"
//         value={form.email}
//         onChange={e =>
//           setForm({ ...form, email: e.target.value })
//         }
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={e =>
//           setForm({ ...form, password: e.target.value })
//         }
//       />

//       <button onClick={login}>Login</button>
//     </div>
//   );
// }
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="form-card">
        <h2>Welcome Back 👋</h2>
        <p className="sub-text">Login to continue</p>

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={login}>Login</button>

        <p className="switch-text">
          Don’t have an account?
          <span onClick={() => navigate("/register")}> Register</span>
        </p>
      </div>
    </div>
  );
}