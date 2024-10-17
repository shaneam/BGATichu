const newRoundRE = /A new round starts/i
const playsConsecutivePairsRE = /consecutive doubles from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i
const playsPairsRE = /plays Pair of (\d{1,2}|\w)/i
const playsTriplesRE = /plays Triple of (\d{1,2}|\w)/i
const playsStraightRE = /plays Run of \d+ cards from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i
const playsFullHouseRE = /plays (\d{1,2}|\w)\w*'?s? full of (\d{1,2}|\w)\w*'?s?/i
const playsQuadBombRE = /plays Bomb of four (\d{1,2}|\w)/i
const playsStraightBombRE = /plays Straight flush bomb starting from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i
const playsSingleRE = /plays (\d{1,2}|[a-z]+)/i

const cardsRanked = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function getSinglePlayCards(log: string): string[] {

    let match = log.match(playsSingleRE);

    if (match == null) { return []; }

    if (match.length > 2) {
        console.log("Found too many matches " + log)
        return [];
    }
    let card = match[1]

    if (card != "DOG" && card != "DRAGON") {
        card = card.at(0) ?? "";
    }
    console.log("found single " + card);
    return [card];
}

function getPairPlayCards(log: string): string[] {

    let match = log.match(playsPairsRE);

    if (match == null) { return []; }

    if (match.length > 2) {
        console.log("Found too many matches " + log)
        return [];
    }

    console.log("found pair " + match[1]);
    return [match[1], match[1]];
}

function getTriplePlayCards(log: string): string[] {

    let match = log.match(playsTriplesRE);

    if (match == null) { return []; }

    if (match.length > 2) {
        console.log("Found too many matches " + log)
        return [];
    }

    console.log("found triple " + match[1]);
    return [match[1], match[1], match[1]];
}

function getQuadBombCards(log: string): string[] {

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



function getConsecutivePairsCards(log: string): string[] {

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

function getStraightCards(log: string): string[] {

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

function getStraightBombCards(log: string): string[] {

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

function getFullHouseCards(log: string): string[] {

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

let cardsUsed = new Map<string, number>();
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        console.log(cardsUsed);
        if (request.method === "getCards")
            sendResponse(Object.fromEntries(cardsUsed));
    }
);

function processLogText(log: string) {
    if (newRoundRE.test(log)) {
        cardsUsed.clear();
        console.log("Reseting card counts");
        return;
    }

    let cards = getConsecutivePairsCards(log);
    if (cards.length == 0) {
        cards = getPairPlayCards(log);
    }
    if (cards.length == 0) {
        cards = getTriplePlayCards(log);
    }
    if (cards.length == 0) {
        cards = getStraightCards(log);
    }
    if (cards.length == 0) {
        cards = getFullHouseCards(log);
    }
    if (cards.length == 0) {
        cards = getQuadBombCards(log);
    }
    if (cards.length == 0) {
        cards = getStraightBombCards(log);
    }
    if (cards.length == 0) {
        cards = getSinglePlayCards(log);
    }
    console.log("Found cards: " + cards);
    for (let card of cards) {
        cardsUsed.set(card, (cardsUsed.get(card) ?? 0) + 1);
    }
}

// Callback function to execute when mutations are observed
const callback = (mutationList: MutationRecord[], observer: MutationObserver) => {
    mutationList
        .filter(mutation => mutation.type === "childList")
        .forEach(node => node.addedNodes
            .forEach(subNode => {
                const text = subNode.textContent;
                if (text) {
                    console.log(text);
                    processLogText(text.toUpperCase()); }
            }));
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Options for the observer (which mutations to observe)
const config = { childList: true };


// Select the node that will be observed for mutations
const targetNode = document.getElementById("logs");

if (targetNode) {
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}
/*
// Select the node that will be observed for mutations
const targetNode2 = document.getElementById("replaylogs");
if (targetNode2) {
    // Start observing the target node for configured mutations
    observer.observe(targetNode2, config);

}*/