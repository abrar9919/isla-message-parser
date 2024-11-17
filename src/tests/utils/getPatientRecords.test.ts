import getPatientRecords from "../../utils/getPatientRecords";

describe("getPatientRecords", () => {
  test("should correctly parse patient records with all fields", () => {
    const prsSegment = "PRS|1|2|3|Smith^John^A|5|6|7|19800101|9";
    const result = getPatientRecords(prsSegment);

    expect(result).toEqual({
      fullName: {
        lastName: "Smith",
        firstName: "John",
        middleName: "A",
      },
      dateOfBirth: "1980-01-01",
    });
  });

  test("should handle patient records without middle name", () => {
    const prsSegment = "PRS|1|2|3|Smith^John|5|6|7|19800101|9";
    const result = getPatientRecords(prsSegment);

    expect(result).toEqual({
      fullName: {
        lastName: "Smith",
        firstName: "John",
        middleName: undefined,
      },
      dateOfBirth: "1980-01-01",
    });
  });

  test("should throw error when name field is missing", () => {
    const prsSegment = "PRS|1|2|3||5|6|7|19800101|9";

    expect(() => {
      getPatientRecords(prsSegment);
    }).toThrow("Unable to find patient name");
  });

  test("should throw error when DOB is missing", () => {
    const prsSegment = "PRS|1|2|3|Smith^John^A|5|6|7||9";

    expect(() => {
      getPatientRecords(prsSegment);
    }).toThrow("Unable to find patient date of birth");
  });

  test("should correctly format different date patterns", () => {
    const prsSegment = "PRS|1|2|3|Smith^John^A|5|6|7|20231231|9";
    const result = getPatientRecords(prsSegment);

    expect(result.dateOfBirth).toBe("2023-12-31");
  });

  //   Unsure if this is a valid case, and what to do in this situation
  test("should handle extra name parts gracefully", () => {
    const prsSegment = "PRS|1|2|3|Smith^John^A^Jr^III|5|6|7|19800101|9";
    const result = getPatientRecords(prsSegment);

    expect(result.fullName).toEqual({
      lastName: "Smith",
      firstName: "John",
      middleName: "A",
    });
  });

  test("should throw an error if the string format is invalid", () => {
    const prsSegment = "invalid";

    expect(() => {
      getPatientRecords(prsSegment);
    }).toThrow("Unable to find patient name");
  });

  // Test empty string handling
  test("should throw an error if the string is empty empty string input", () => {
    const prsSegment = "";

    expect(() => {
      getPatientRecords(prsSegment);
    }).toThrow("Unable to find patient name");
  });
});
