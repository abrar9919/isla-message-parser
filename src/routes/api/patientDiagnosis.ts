import express from "express";
import patientDiagnosis from "../../controllers/patientDiagnosisController";

const patientDiagnosisRouter = express.Router();

patientDiagnosisRouter.post("/diagnosis", patientDiagnosis);
export default patientDiagnosisRouter;
