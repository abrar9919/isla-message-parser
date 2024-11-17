import { Request, Response } from "express";
import { getMessageSegments } from "../utils/messageParsing";
import segmentValidation from "../utils/messageValidation";
import CustomError from "../utils/CustomerError";
import getPatientRecords from "../utils/getPatientRecords";
import getPatientDiagnosis from "../utils/getPatientDiagnosis";

const validateMessageBody = (message: string) => {
  const messageSegments = getMessageSegments(message);

  // Step 2: Get all the different segments
  const parsedMessageJson = segmentValidation(messageSegments);
  return parsedMessageJson;
};

const patientDiagnosis = (req: Request, res: Response) => {
  try {
    const message = req.body.message;
    if (!message) throw new CustomError("Message is required.", 400);

    //   Step 1: Validate message body and get each segment
    const validatedMessage = validateMessageBody(message);

    // Step 2: Get Patient recordw
    const patientRecords = getPatientRecords(validatedMessage.PRS ?? "");

    const patientDiagnosis = getPatientDiagnosis(validatedMessage.DET ?? "");

    res.json({ ...patientRecords, ...patientDiagnosis });
  } catch (e) {
    if (e instanceof CustomError) {
      // If it's a CustomError, send a structured JSON response
      res.status(e.statusCode).json({
        message: e.message,
        statusCode: e.statusCode,
      });
    }
  }
};

export default patientDiagnosis;
