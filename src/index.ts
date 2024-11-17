import express from "express";
import patientDiagnosisRouter from "./routes/api/patientDiagnosis";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use("/api/patient", patientDiagnosisRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
