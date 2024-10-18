import LogExtractor from "./log_extractor";

const logExtractor = new LogExtractor();
// Callback function to execute when mutations are observed
const callback = (mutationList: MutationRecord[], observer: MutationObserver) => {
    mutationList
        .filter(mutation => mutation.type === "childList")
        .forEach(node => node.addedNodes
            .forEach(subNode => {
                const text = subNode.textContent;
                if (text) {
                    console.log(text);
                    logExtractor.processLogText(text.toUpperCase()); }
            }));
};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        console.log(logExtractor.getCardsUsed());
        if (request.method === "getCards")
            sendResponse(Object.fromEntries(logExtractor.getCardsUsed()));
    }
);

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