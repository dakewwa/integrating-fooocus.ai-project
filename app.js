const express = require("express");
const fal = require("@fal-ai/serverless-client");
const app = express();
const PORT = 888;

fal.config({
  credentials:
    "fd3cdb08-c865-45f2-8a7a-ab82bb5cf84d:b0f8734a55b19963cf28ae28b1d6ba88", // or a function that returns a string
});

app.use(express.static("./"));
app.use(express.json());

app.post("/api", async (req, res) => {
  const result = await fal.subscribe("fal-ai/fooocus", {
    input: {
      prompt: req.body.description,
      
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });
  res.json(result);
  console.log(result);
});

app.listen(PORT, () => {
  console.log("Server is run!");
});