import cors from "cors";

const whitelist = ["https://kanban-board-accio-mern-assignment.onrender.com"];

function handleOrigin(origin, callback) {
  console.log("Origin received:", origin);
  if (!origin || whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error(`Not allowed by CORS: ${origin}`));
  }
}

const options = {
  origin: handleOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default cors(options);
