import LogExtractor from "./log_extractor";

const specialCards = [
    // Dog and Dragon get the full name as they're they're the only initial
    // letter collision, rest get the inital letter.
    ["DRAGON", "DRAGON"], ["phoenix", "p"], ["dog", "dog"], ["MaHjOng", "M"], ["queen", "q"]
];

describe('getSinglePlayCards', () => {
    const logExtractor = new LogExtractor();

    it.each([["2", "2"], ["10", "10"], ["queen", "q"], ...specialCards])
        ('parses %s as %s', (card, want) => {
            expect(logExtractor.getSinglePlayCards("Plays " + card)).toStrictEqual([want]);
        });
});
