import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/cover-letter", async (req, res) => {
  try {
    const { company, role, description, skills } = req.body;

    const prompt = `
    Write a professional cover letter for:

    Company: ${company}
    Role: ${role}
    Job Description: ${description}
    Skills: ${skills}
    `;

   const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "meta-llama/llama-3-8b-instruct",
    messages: [{ role: "user", content: prompt }]
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

    res.json({
      text: response.data.choices[0].message.content.trim()
    });

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default router;