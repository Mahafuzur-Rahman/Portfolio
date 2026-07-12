import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json({ limit: "10mb" }));

  // API Route to fetch current portfolio data dynamically from server disk
  app.get("/api/portfolio", (req, res) => {
    try {
      const filePath = path.join(process.cwd(), "src", "portfolioData.json");
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf-8");
        return res.json(JSON.parse(data));
      }
      return res.status(404).json({ error: "Portfolio data file not found" });
    } catch (error: any) {
      console.error("Error reading portfolio data:", error);
      return res.status(500).json({ error: error.message || "Failed to read portfolio" });
    }
  });

  // API Route to save customized portfolio data directly to the codebase
  app.post("/api/save-portfolio", async (req, res) => {
    try {
      const updatedData = req.body;
      if (!updatedData || typeof updatedData !== "object") {
        return res.status(400).json({ error: "Invalid portfolio data payload" });
      }

      // Write to the source file in development so it updates the codebase permanently
      const sourcePath = path.join(process.cwd(), "src", "portfolioData.json");
      fs.writeFileSync(sourcePath, JSON.stringify(updatedData, null, 2), "utf-8");
      
      console.log("Successfully saved updated portfolio details to codebase:", sourcePath);
      return res.json({ success: true, message: "Portfolio saved permanently to codebase!" });
    } catch (error: any) {
      console.error("Error saving portfolio data to codebase:", error);
      return res.status(500).json({ error: error.message || "Failed to save portfolio to codebase" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
