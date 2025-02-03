/* Regex extractions for each kind of hand played.

  We extract only the first letter of each card with the exception of the dragon/dog in the single card play as they
  have the same starting letter.

  Note: The phoenix is not always discernible from the logs as it is not always specified such as in the middle of a
  straight, or part of a pair/triple.  This is a limitation of the log approach.
*/

const newRoundRE = /A new round starts/i
const playsConsecutivePairsRE = /consecutive doubles from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i
const playsPairsRE = /plays Pair of (\d{1,2}|\w)/i
const playsTriplesRE = /plays Triple of (\d{1,2}|\w)/i
const playsStraightRE = /plays Run of \d+ cards from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i
const playsFullHouseRE = /plays (\d{1,2}|\w)\w*'?s? full of (\d{1,2}|\w)\w*'?s?/i
const playsQuadBombRE = /plays Bomb of four (\d{1,2}|\w)/i
const playsStraightBombRE = /plays Straight flush bomb starting from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i
const playsSingleRE = /plays (\d{1,2}|dragon|dog|[a-z])/i

// The canonical representation of each standard card and their relative order, lowest to highest.
const cardsRanked = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export = LogExtractor;

/**
    Utility for extracting cards from log messages and cumulative container for extracted cards.

    It is intended that all log messages are passed through the class.
    The utility detects when a new hand starts and resets as such.
 */
class LogExtractor {
    private cardsUsed = new Map<string, number>();
    /**
        View of the currently extracted cards.

        Response is a Map from the single letter representation of a card to how many times it has be observed.

        Representation is that in cardsRanked for standard cards and
        * P - Phoenix
        * M - Mahjong / 1
        * DRAGON
        * DOG

        Single letters don't suffice from Dragon/Dog so the full name is used.
     */
    getCardsUsed(): Map<string, number> {
        return this.cardsUsed;
    }

    // The following getXPlayCards methods process a log message for the kind of hand indicated.

    getSinglePlayCards(log: string): string[] {

        let match = log.match(playsSingleRE);

        if (match == null) { return []; }

        if (match.length > 2) {
            console.log("Found too many matches " + log)
            return [];
        }
        let card = match[1]
        console.log("found single " + card);
        return [card];
    }

    getPairPlayCards(log: string): string[] {

        let match = log.match(playsPairsRE);

        if (match == null) { return []; }

        if (match.length > 2) {
            console.log("Found too many matches " + log)
            return [];
        }

        console.log("found pair " + match[1]);
        return [match[1], match[1]];
    }

    getTriplePlayCards(log: string): string[] {

        let match = log.match(playsTriplesRE);

        if (match == null) { return []; }

        if (match.length > 2) {
            console.log("Found too many matches " + log)
            return [];
        }

        console.log("found triple " + match[1]);
        return [match[1], match[1], match[1]];
    }

    getQuadBombCards(log: string): string[] {

        let match = log.match(playsQuadBombRE);

        if (match == null) { return []; }

        if (match.length > 2) {
            console.log("Found too many matches " + log)
            return [];
        }
        const bomb = match[1];

        console.log("found quad " + bomb + " bomb");
        return [bomb, bomb, bomb, bomb];
    }



    getConsecutivePairsCards(log: string): string[] {

        let match = log.match(playsConsecutivePairsRE);

        if (match == null) { return []; }

        if (match.length > 3) {
            console.log("Found too many matches " + log)
            return [];
        }

        console.log("found pairs " + match[1] + " to " + match[2]);
        var cards: string[] = [];
        var record = false;
        for (var card of cardsRanked) {
            if (!record && card == match[1]) {
                record = true;
            }
            if (record) {
                cards.push(card);
                cards.push(card);
            }
            if (card == match[2]) {
                break;
            }
        }
        return cards;
    }

    getStraightCards(log: string): string[] {

        let match = log.match(playsStraightRE);

        if (match == null) { return []; }

        if (match.length > 3) {
            console.log("Found too many matches " + log)
            return [];
        }

        const start = match[1];
        const end = match[2];
        console.log("found straight " + start + " to " + end);
        var cards: string[] = [];
        var record = false;
        for (var card of cardsRanked) {
            if (!record && card == start) {
                record = true;
            }
            if (record) {
                cards.push(card);
            }
            if (card == end) {
                break;
            }
        }
        return cards;
    }

    getStraightBombCards(log: string): string[] {

        let match = log.match(playsStraightBombRE);

        if (match == null) { return []; }

        if (match.length > 3) {
            console.log("Found too many matches " + log)
            return [];
        }

        const start = match[1];
        const end = match[2];
        console.log("found straight bomb " + start + " to " + end);
        var cards: string[] = [];
        var record = false;
        for (var card of cardsRanked) {
            if (!record && card == start) {
                record = true;
            }
            if (record) {
                cards.push(card);
            }
            if (card == end) {
                break;
            }
        }
        return cards;
    }

    getFullHouseCards(log: string): string[] {

        let match = log.match(playsFullHouseRE);

        if (match == null) { return []; }

        if (match.length > 3) {
            console.log("Found too many matches " + log)
            return [];
        }

        const triple = match[1];
        const double = match[2];
        console.log("found full house 3 " + triple + " and 2 " + double);

        return [triple, triple, triple, double, double];
    }


/** Processes a single line of log text, updating the internal record appropriately. */
    processLogText(log: string) {
        if (newRoundRE.test(log)) {
            this.cardsUsed.clear();
            console.log("Resetting card counts");
            return;
        }

        let cards = this.getConsecutivePairsCards(log);
        // The order of processing is important as some messages can be construed as others.
        // The Single card play especially as it lacks defining characteristics the others have.
        if (cards.length == 0) {
            cards = this.getPairPlayCards(log);
        }
        if (cards.length == 0) {
            cards = this.getTriplePlayCards(log);
        }
        if (cards.length == 0) {
            cards = this.getStraightCards(log);
        }
        if (cards.length == 0) {
            cards = this.getFullHouseCards(log);
        }
        if (cards.length == 0) {
            cards = this.getQuadBombCards(log);
        }
        if (cards.length == 0) {
            cards = this.getStraightBombCards(log);
        }
        if (cards.length == 0) {
            cards = this.getSinglePlayCards(log);
        }
        console.log("Found cards: " + cards);
        for (let card of cards) {
            this.cardsUsed.set(card, (this.cardsUsed.get(card) ?? 0) + 1);
        }
    }
}