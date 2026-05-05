import { useState } from "react";
import API from "../api";
import jsPDF from "jspdf";

function AIGenerator() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
    skills: ""
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      const res = await API.post("/ai/cover-letter", form);
      setResult(res.data.text);
    } catch (err) {
      console.error(err);
      alert("Error generating cover letter");
    } finally {
      setLoading(false);
    }
  };

  const downloadTXT = () => {
    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "cover-letter.txt";
    element.click();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(result, 180);
    doc.text(lines, 10, 10);
    doc.save("cover-letter.pdf");
  };

  return (
    <div className="page">

      {/* FORM CARD */}
      <div className="form-card">
        <h2>✨ AI Cover Letter Generator</h2>

        <input
          placeholder="Company"
          onChange={e => setForm({ ...form, company: e.target.value })}
        />

        <input
          placeholder="Role"
          onChange={e => setForm({ ...form, role: e.target.value })}
        />

        <textarea
          placeholder="Job Description"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Skills"
          onChange={e => setForm({ ...form, skills: e.target.value })}
        />

        <button onClick={generate} className="generate-btn">
          {loading ? "Generating..." : "🚀 Generate"}
        </button>
      </div>

      {/* OUTPUT */}
      {result && (
        <div className="output-card">
          <h3>📄 Generated Cover Letter</h3>

          <div className="output-text">
            {result}
          </div>

          <div className="download-buttons">
            <button onClick={downloadTXT}>⬇ Download TXT</button>
            <button onClick={downloadPDF}>⬇ Download PDF</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default AIGenerator;