import { getZipCodeFromPrompt, validateZipCode } from "@/utils/utils";

// zip code or post code validation
test("is valid zip code", () => {
  expect(validateZipCode("BD", 1730)).toBeTruthy();
});

// math zip code regex
test("is zip code regex match", () => {
  expect(
    getZipCodeFromPrompt(
      "w:120d40,w:12001,w:sdrg10,w:10sdr20,w:120gfg,w:gag100 , gasdfae20 gas200 w:gaga  sdfasdfads hello this is tamim w:tamim20  hi ashdad  ghaga  w:"
    )
  ).toEqual([
    "w:120d40",
    "w:12001",
    "w:sdrg10",
    "w:10sdr20",
    "w:120gfg",
    "w:gag100",
    "w:gaga",
    "w:tamim20",
  ]);

    expect(
      getZipCodeFromPrompt(
        "this is a just string"
      )
    ).toBe(null);

});
