import { useEffect, useState } from "react";
import API from "../api";
import JobCard from "../components/JobCard";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  // ✅ ADD THESE (IMPORTANT)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete
  const handleDelete = (id) => {
    setJobs(prev => prev.filter(job => job._id !== id));
  };

  // Update status
  const handleStatusUpdate = (updatedJob) => {
    setJobs(prev =>
      prev.map(job =>
        job._id === updatedJob._id ? updatedJob : job
      )
    );
  };

  // ✅ FILTER LOGIC
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      (job.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (job.role || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats
  const total = jobs.length;
  const applied = jobs.filter(j => j.status === "Applied").length;
  const interview = jobs.filter(j => j.status === "Interview").length;
  const rejected = jobs.filter(j => j.status === "Rejected").length;

  return (
    <div className="page">

      {/* 🔍 Search + Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* 📊 Stats */}
      <div className="stats">
  <div className="stat-card total">Total <span>{total}</span></div>
  <div className="stat-card applied">Applied <span>{applied}</span></div>
  <div className="stat-card interview">Interview <span>{interview}</span></div>
  <div className="stat-card rejected">Rejected <span>{rejected}</span></div>
</div>
      {/* Jobs */}
      <div className="job-grid">
        {filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
            />
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;