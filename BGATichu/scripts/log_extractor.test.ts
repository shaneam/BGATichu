import LogExtractor from "./log_extractor";

describe('getSinglePlayCards', () => {
    const logExtractor = new LogExtractor();

    it.each([["2", "2"], ["10", "10"], ["DRAGON", "DRAGON"], ["queen", "q"]])
        ('parses %s as %s', (card, want) => {
            expect(logExtractor.getSinglePlayCards("Plays " + card)).toStrictEqual([want]);
        });
});
