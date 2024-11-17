import CustomError from "./CustomerError";

const getPatientRecords = (prsSegment: string) => {
  const prsFields = prsSegment.split("|");
  // Extract the relevant fields from the PRS segment
  const nameField = prsFields[4]; // "Smith^John^A"

  if (!nameField) throw new CustomError("Unable to find patient name", 400);
  const dob = prsFields[8]; // "19800101

  if (!dob) throw new CustomError("Unable to find patient date of birth", 400);

  const [lastName, firstName, middleName] = nameField.split("^");

  return {
    fullName: {
      lastName,
      firstName,
      middleName,
    },
    dateOfBirth: `${dob.slice(0, 4)}-${dob.slice(4, 6)}-${dob.slice(6, 8)}`, // Format DOB as YYYY-MM-DD
  };
};

export default getPatientRecords;
