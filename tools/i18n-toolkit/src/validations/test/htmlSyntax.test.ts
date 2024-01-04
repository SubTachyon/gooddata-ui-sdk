// (C) 2020-2022 GoodData Corporation

// import { getHtmlSyntaxCheck } from "../htmlSyntax";
import { describe, it, expect } from "vitest";

// this dummy test should be removed once package will be migrated to ESM
describe("validate html message tests", () => {
    it("dummy test", async () => {
        expect(true).toBe(true);
    });
});

// this test should be fixed once package will be migrated to ESM

// type Scenario = [string, string, string | null];

// describe("validate html message tests", () => {
//     const scenarios: Scenario[] = [
//         ["simple text", "This is message", null],
//         ["simple html", "This is <b>message</b>", null],
//         [
//             "simple invalid html non sense",
//             "This is <bmessage</b>",
//             `Html format of localization is not correct, see: "This is <bmessage</b>"`,
//         ],
//     ];

//     it.each(scenarios)("validate %s", async (_: any, msg: any, err: any) => {
//         if (err) {
//             await expect(getHtmlSyntaxCheck([msg])).rejects.toThrowError(err);
//         } else {
//             await expect(getHtmlSyntaxCheck([msg])).resolves.not.toThrow();
//         }
//     });
// });
