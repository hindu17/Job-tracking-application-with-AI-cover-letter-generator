// import { useState } from "react";
// import API from "../api";

// const statusColors = {
//   Applied: "status-applied",
//   Interview: "status-interview",
//   Rejected: "status-rejected"
// };

// function JobCard({ job, onDelete, onStatusUpdate }) {
//   const [open, setOpen] = useState(false);

//   const handleDelete = async () => {
//     try {
//       await API.delete(`/jobs/${job._id}`);
//       onDelete(job._id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const res = await API.put(`/jobs/${job._id}`, {
//         status: newStatus
//       });

//       // ✅ Update UI immediately
//       onStatusUpdate(res.data);

//       setOpen(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>{job.role}</h3>

//         <div className="dropdown">
//           <div
//             className={`status-badge ${statusColors[job.status]}`}
//             onClick={() => setOpen(!open)}
//           >
//             {job.status} ▼
//           </div>

//           {open && (
//             <div className="dropdown-menu">
//               <div onClick={() => handleStatusChange("Applied")}>
//                 Applied
//               </div>
//               <div onClick={() => handleStatusChange("Interview")}>
//                 Interview
//               </div>
//               <div onClick={() => handleStatusChange("Rejected")}>
//                 Rejected
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <p className="company">{job.company}</p>
//       <p className="desc">{job.description}</p>

//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// }

// export default JobCard;


import { useState } from "react";
import API from "../api";

const statusColors = {
  Applied: "status-applied",
  Interview: "status-interview",
  Rejected: "status-rejected"
};

function JobCard({ job, onDelete, onStatusUpdate }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await API.delete(`/jobs/${job._id}`);
    onDelete(job._id);
  };

  const handleStatusChange = async (status) => {
    const res = await API.put(`/jobs/${job._id}`, { status });
    onStatusUpdate(res.data);
    setOpen(false);
  };

  return (
    <div className="card">
      <div className="card-header">

        <h3>{job.role}</h3>

        <div className="actions">
          {/* Dropdown */}
          <div className="dropdown">
            <div
              className={`status-badge ${statusColors[job.status]}`}
              onClick={() => setOpen(!open)}
            >
              {job.status} ▼
            </div>

            {open && (
              <div className="dropdown-menu">
                <div onClick={() => handleStatusChange("Applied")}>Applied</div>
                <div onClick={() => handleStatusChange("Interview")}>Interview</div>
                <div onClick={() => handleStatusChange("Rejected")}>Rejected</div>
              </div>
            )}
          </div>

          {/* Delete */}
          <button className="delete-btn" onClick={handleDelete}>
            ✖
          </button>
        </div>

      </div>

      <p className="company">{job.company}</p>
      <p className="desc">{job.description}</p>
    </div>
  );
}

export default JobCard;