// tests/messageParser.test.ts
import { getMessageSegments } from "../../utils/messageParsing"; // Adjust the path as needed

const messageInSegments = [
  "MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233",
  "EVT|TYPE|20230502112233",
  "PRS|1|9876543210^^^Location^ID||Smith^John^A|||M|19800101|",
  "DET|1|I|^^MainDepartment^101^Room 1|Common Cold",
];

describe("getMessageSegments Function", () => {
  it("returns the correct number of segments based on new line characters", () => {
    const message = `MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233\nEVT|TYPE|20230502112233\nPRS|1|9876543210^^^Location^ID||Smith^John^A|||M|19800101|\nDET|1|I|^^MainDepartment^101^Room 1|Common Cold`;

    const result = getMessageSegments(message);
    expect(result).toEqual(messageInSegments);
  });

  it("return the correct number of segments for multi line strings", () => {
    const message = `MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233
EVT|TYPE|20230502112233
PRS|1|9876543210^^^Location^ID||Smith^John^A|||M|19800101|
DET|1|I|^^MainDepartment^101^Room 1|Common Cold`;

    const result = getMessageSegments(message);
    expect(result).toEqual(messageInSegments);
  });
});
