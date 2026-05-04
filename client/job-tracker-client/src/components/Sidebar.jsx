// import { Link } from "react-router-dom";

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h2>JobAI</h2>
//       <Link to="/">Dashboard</Link>
//       <Link to="/add">Add Job</Link>
//       <Link to="/ai">AI Generator</Link>
//     </div>
//   );
// }

// export default Sidebar;

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">🚀 JobAI</h2>

      <nav>
        <Link to="/">📊 Dashboard</Link>
        <Link to="/add">➕ Add Job</Link>
        <Link to="/ai">🤖 AI Generator</Link>
      </nav>
    </div>
  );
}

export default Sidebar;