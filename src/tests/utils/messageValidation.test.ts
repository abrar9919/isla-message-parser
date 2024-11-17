import segmentValidation from "../../utils/messageValidation";
import { MessageSegmentType } from "../../types/MessageSegmentType";

describe("segmentValidation Function", () => {
  it("should correctly parse valid segments", () => {
    const messages = [
      "MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233",
      "EVT|TYPE|20230502112233",
      "PRS|1|9876543210^^^Location^ID||Smith^John^A|||M|19800101|",
      "DET|1|I|^^MainDepartment^101^Room 1|Common Cold",
    ];

    const result = segmentValidation(messages);

    expect(result).toEqual({
      [MessageSegmentType.Message]:
        "MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233",
      [MessageSegmentType.EVT]: "EVT|TYPE|20230502112233",
      [MessageSegmentType.PATIENT_INFO]:
        "PRS|1|9876543210^^^Location^ID||Smith^John^A|||M|19800101|",
      [MessageSegmentType.DETAILS]:
        "DET|1|I|^^MainDepartment^101^Room 1|Common Cold",
    });
  });

  it("should throw an error if a message does not match any segment type", () => {
    const messages = [
      "MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233",
      "EVT|TYPE|20230502112233",
      "INVALID|some|invalid|segment", // Invalid segment
      "DET|1|I|^^MainDepartment^101^Room 1|Common Cold",
    ];

    expect(() => segmentValidation(messages)).toThrow(
      "Message does not have the right segment type"
    );
  });

  it("should throw an error if the function receives an empty string", () => {
    expect(() => segmentValidation([])).toThrow("Missing segments");
  });

  it("should throw an error if segments are missing", () => {
    const messages = [
      "MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233",
      "EVT|TYPE|20230502112233",
    ];

    expect(() => segmentValidation(messages)).toThrow("Missing segments");
  });

  it("should correctly parse segments even if they are out of order", () => {
    const messages = [
      "DET|1|I|^^MainDepartment^101^Room 1|Common Cold",
      "PRS|1|9876543210^^^Location^ID||Smith^John^A|||M|19800101|",
      "EVT|TYPE|20230502112233",
      "MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233",
    ];

    const result = segmentValidation(messages);

    expect(result).toEqual({
      [MessageSegmentType.DETAILS]:
        "DET|1|I|^^MainDepartment^101^Room 1|Common Cold",
      [MessageSegmentType.PATIENT_INFO]:
        "PRS|1|9876543210^^^Location^ID||Smith^John^A|||M|19800101|",
      [MessageSegmentType.EVT]: "EVT|TYPE|20230502112233",
      [MessageSegmentType.Message]:
        "MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233",
    });
  });
});
