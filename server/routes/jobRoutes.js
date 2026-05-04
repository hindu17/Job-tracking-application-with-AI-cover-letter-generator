// import express from "express";
// import Job from "../models/Job.js";

// const router = express.Router();

// // Create job
// router.post("/", async (req, res) => {
//   const job = new Job(req.body);
//   await job.save();
//   res.json(job);
// });

// // Get all jobs
// router.get("/", async (req, res) => {
//   const jobs = await Job.find();
//   res.json(jobs);
// });

// // ✅ Update job (STATUS)
// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await Job.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       // { new: true }
//        { returnDocument: "after" } 
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Job not found" });
//     }

//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Update failed" });
//   }
// });

// // Delete job
// router.delete("/:id", async (req, res) => {
//   await Job.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

// export default router;
import express from "express";
import Job from "../models/Job.js";
import auth from "../middleware/auth.js";

const router = express.Router();


// ✅ CREATE JOB
router.post("/", auth, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.user.id
    });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job" });
  }
});


// ✅ GET USER JOBS
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});


// ✅ UPDATE JOB
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // 🔥 protect user data
      req.body,
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


// ✅ DELETE JOB
router.delete("/:id", auth, async (req, res) => {
  try {
    await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id   // 🔥 secure delete
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;