import getPatientDiagnosis from "../../utils/getPatientDiagnosis";

describe("getPatientDiagnosis", () => {
  // Test successful case
  test("should correctly extract primary condition", () => {
    const detSegment = "DET|1|2|3|Hypertension|5|6";
    const result = getPatientDiagnosis(detSegment);

    expect(result).toEqual({
      primaryCondition: "Hypertension",
    });
  });

  test("should ignore extra fields", () => {
    const detSegment = "DET|1|2|3|Diabetes|5|6|7|8|9|10";
    const result = getPatientDiagnosis(detSegment);

    expect(result).toEqual({
      primaryCondition: "Diabetes",
    });
  });

  test("should handle fewer fields", () => {
    const detSegment = "DET|1|2|3";
    const result = getPatientDiagnosis(detSegment);

    expect(result).toEqual({
      primaryCondition: undefined,
    });
  });

  test("should handle empty string input", () => {
    const detSegment = "";
    const result = getPatientDiagnosis(detSegment);

    expect(result).toEqual({
      primaryCondition: undefined,
    });
  });

  test("should handle conditions containing pipe character", () => {
    const detSegment = "DET|1|2|3|Type 1 | Type 2 Diabetes|5|6";
    const result = getPatientDiagnosis(detSegment);

    expect(result).toEqual({
      primaryCondition: "Type 1 ",
    });
  });

  test("should handle multiple consecutive delimiters", () => {
    const detSegment = "DET|1|2|3|||5|6";
    const result = getPatientDiagnosis(detSegment);

    expect(result).toEqual({
      primaryCondition: "",
    });
  });
});
