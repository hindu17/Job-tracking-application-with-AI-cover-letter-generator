import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddJob() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
    status: "Applied"
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!form.company || !form.role) {
        alert("Company and Role are required");
        return;
      }

      await API.post("/jobs", form);

      // reset + redirect
      setForm({ company: "", role: "", description: "", status: "Applied" });
      navigate("/");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-page">
      <h1 className="page-title">➕ Add New Job</h1>

      <div className="form-card">

        <div className="form-group">
          <label>Company</label>
          <input
            value={form.company}
            placeholder="Enter company name"
            onChange={e => setForm({ ...form, company: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            value={form.role}
            placeholder="Enter role"
            onChange={e => setForm({ ...form, role: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            value={form.description}
            placeholder="Add notes (optional)"
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          🚀 Add Job
        </button>

      </div>
    </div>
  );
}