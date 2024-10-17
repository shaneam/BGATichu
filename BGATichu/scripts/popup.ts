(async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tab.id == null) { return; }
    const response = await chrome.tabs.sendMessage(tab.id, { method: "getCards" });
    // do something with response here, not outside the function
    console.log(response);
    const cards: Map<string, number> = new Map(Object.entries(response));
    for (const [card, count] of cards) {
        for (let num = 1; num <= count; ++num) {
            const domId = card + "_" + String(num);
            console.log("Dom: " + domId);
            const domEl =
                document.getElementById(domId);
            if (domEl) {
                domEl.style.color = "grey";
                domEl.style.fontWeight = "normal";
            }
        }
    }

}
)();