import { MessageSegmentType } from "../types/MessageSegmentType";
import CustomError from "./CustomerError";

const segmentValidation = (messages: string[]) => {
  // Get all enum values as an array
  const segmentTypes = Object.values(MessageSegmentType);
  const patientDiagnosisJson: { [key in MessageSegmentType]?: string } = {}; // Ensure it's properly typed
  // Check if any enum value matches the beginning of the string

  for (const message of messages) {
    const individualSegment = segmentTypes.find((value) =>
      message.startsWith(value)
    );
    // If the item exists in the segment, then add it to the json, otherwise throw an error
    if (individualSegment) patientDiagnosisJson[individualSegment] = message;
    else throw new CustomError("Message does not have the right segment type");
  }

  if (Object.keys(patientDiagnosisJson).length === segmentTypes.length)
    return patientDiagnosisJson;
  else throw new CustomError("Missing segments");
};

export default segmentValidation;
