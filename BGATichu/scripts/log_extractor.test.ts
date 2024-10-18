import LogExtractor from "./log_extractor";

test('getSinglePlayCards', () => {
    const logExtractor = new LogExtractor();
    expect(logExtractor.getSinglePlayCards("Plays 2")).toStrictEqual(["2"]);
});
