(()=>{"use strict";var t={699:t=>{const e=/A new round starts/i,o=/consecutive doubles from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i,r=/plays Pair of (\d{1,2}|\w)/i,s=/plays Triple of (\d{1,2}|\w)/i,n=/plays Run of \d+ cards from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i,l=/plays (\d{1,2}|\w)\w*'?s? full of (\d{1,2}|\w)\w*'?s?/i,a=/plays Bomb of four (\d{1,2}|\w)/i,d=/plays Straight flush bomb starting from (\d{1,2}|\w)\w* to (\d{1,2}|\w)/i,u=/plays (\d{1,2}|dragon|dog|[a-z])/i,i=["2","3","4","5","6","7","8","9","10","J","Q","K","A"];t.exports=class{constructor(){this.cardsUsed=new Map}getCardsUsed(){return this.cardsUsed}getSinglePlayCards(t){let e=t.match(u);if(null==e)return[];if(e.length>2)return console.log("Found too many matches "+t),[];let o=e[1];return console.log("found single "+o),[o]}getPairPlayCards(t){let e=t.match(r);return null==e?[]:e.length>2?(console.log("Found too many matches "+t),[]):(console.log("found pair "+e[1]),[e[1],e[1]])}getTriplePlayCards(t){let e=t.match(s);return null==e?[]:e.length>2?(console.log("Found too many matches "+t),[]):(console.log("found triple "+e[1]),[e[1],e[1],e[1]])}getQuadBombCards(t){let e=t.match(a);if(null==e)return[];if(e.length>2)return console.log("Found too many matches "+t),[];const o=e[1];return console.log("found quad "+o+" bomb"),[o,o,o,o]}getConsecutivePairsCards(t){let e=t.match(o);if(null==e)return[];if(e.length>3)return console.log("Found too many matches "+t),[];console.log("found pairs "+e[1]+" to "+e[2]);var r=[],s=!1;for(var n of i)if(s||n!=e[1]||(s=!0),s&&(r.push(n),r.push(n)),n==e[2])break;return r}getStraightCards(t){let e=t.match(n);if(null==e)return[];if(e.length>3)return console.log("Found too many matches "+t),[];const o=e[1],r=e[2];console.log("found straight "+o+" to "+r);var s=[],l=!1;for(var a of i)if(l||a!=o||(l=!0),l&&s.push(a),a==r)break;return s}getStraightBombCards(t){let e=t.match(d);if(null==e)return[];if(e.length>3)return console.log("Found too many matches "+t),[];const o=e[1],r=e[2];console.log("found straight bomb "+o+" to "+r);var s=[],n=!1;for(var l of i)if(n||l!=o||(n=!0),n&&s.push(l),l==r)break;return s}getFullHouseCards(t){let e=t.match(l);if(null==e)return[];if(e.length>3)return console.log("Found too many matches "+t),[];const o=e[1],r=e[2];return console.log("found full house 3 "+o+" and 2 "+r),[o,o,o,r,r]}processLogText(t){var o;if(e.test(t))return this.cardsUsed.clear(),void console.log("Reseting card counts");let r=this.getConsecutivePairsCards(t);0==r.length&&(r=this.getPairPlayCards(t)),0==r.length&&(r=this.getTriplePlayCards(t)),0==r.length&&(r=this.getStraightCards(t)),0==r.length&&(r=this.getFullHouseCards(t)),0==r.length&&(r=this.getQuadBombCards(t)),0==r.length&&(r=this.getStraightBombCards(t)),0==r.length&&(r=this.getSinglePlayCards(t)),console.log("Found cards: "+r);for(let t of r)this.cardsUsed.set(t,(null!==(o=this.cardsUsed.get(t))&&void 0!==o?o:0)+1)}}},957:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const s=new(r(o(699)).default);chrome.runtime.onMessage.addListener((function(t,e,o){console.log(e.tab?"from a content script:"+e.tab.url:"from the extension"),console.log(s.getCardsUsed()),"getCards"===t.method&&o(Object.fromEntries(s.getCardsUsed()))}));const n=new MutationObserver(((t,e)=>{t.filter((t=>"childList"===t.type)).forEach((t=>t.addedNodes.forEach((t=>{const e=t.textContent;e&&(console.log(e),s.processLogText(e.toUpperCase()))}))))})),l=document.getElementById("logs");l&&n.observe(l,{childList:!0})}},e={};!function o(r){var s=e[r];if(void 0!==s)return s.exports;var n=e[r]={exports:{}};return t[r].call(n.exports,n,n.exports,o),n.exports}(957)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxRQUFxQkUsSUFBakJELEVBQ0gsT0FBT0EsRUFBYUUsUUFHckIsSUFBSUMsRUFBU04sRUFBeUJFLEdBQVksQ0FHakRHLFFBQVMsQ0FBQyxHQU9YLE9BSEFFLEVBQW9CTCxHQUFVTSxLQUFLRixFQUFPRCxRQUFTQyxFQUFRQSxFQUFPRCxRQUFTSixHQUdwRUssRUFBT0QsT0FDZixDQ25CMEJKLENBQW9CLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZWRpdW0tZXh0ZW5zaW9uLy4vc2NyaXB0cy9sb2dfZXh0cmFjdG9yLnRzIiwid2VicGFjazovL21lZGl1bS1leHRlbnNpb24vLi9zY3JpcHRzL3RpY2h1LnRzIiwid2VicGFjazovL21lZGl1bS1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVkaXVtLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbmV3Um91bmRSRSA9IC9BIG5ldyByb3VuZCBzdGFydHMvaVxuY29uc3QgcGxheXNDb25zZWN1dGl2ZVBhaXJzUkUgPSAvY29uc2VjdXRpdmUgZG91YmxlcyBmcm9tIChcXGR7MSwyfXxcXHcpXFx3KiB0byAoXFxkezEsMn18XFx3KS9pXG5jb25zdCBwbGF5c1BhaXJzUkUgPSAvcGxheXMgUGFpciBvZiAoXFxkezEsMn18XFx3KS9pXG5jb25zdCBwbGF5c1RyaXBsZXNSRSA9IC9wbGF5cyBUcmlwbGUgb2YgKFxcZHsxLDJ9fFxcdykvaVxuY29uc3QgcGxheXNTdHJhaWdodFJFID0gL3BsYXlzIFJ1biBvZiBcXGQrIGNhcmRzIGZyb20gKFxcZHsxLDJ9fFxcdylcXHcqIHRvIChcXGR7MSwyfXxcXHcpL2lcbmNvbnN0IHBsYXlzRnVsbEhvdXNlUkUgPSAvcGxheXMgKFxcZHsxLDJ9fFxcdylcXHcqJz9zPyBmdWxsIG9mIChcXGR7MSwyfXxcXHcpXFx3Kic/cz8vaVxuY29uc3QgcGxheXNRdWFkQm9tYlJFID0gL3BsYXlzIEJvbWIgb2YgZm91ciAoXFxkezEsMn18XFx3KS9pXG5jb25zdCBwbGF5c1N0cmFpZ2h0Qm9tYlJFID0gL3BsYXlzIFN0cmFpZ2h0IGZsdXNoIGJvbWIgc3RhcnRpbmcgZnJvbSAoXFxkezEsMn18XFx3KVxcdyogdG8gKFxcZHsxLDJ9fFxcdykvaVxuY29uc3QgcGxheXNTaW5nbGVSRSA9IC9wbGF5cyAoXFxkezEsMn18ZHJhZ29ufGRvZ3xbYS16XSkvaVxuXG5jb25zdCBjYXJkc1JhbmtlZCA9IFtcIjJcIiwgXCIzXCIsIFwiNFwiLCBcIjVcIiwgXCI2XCIsIFwiN1wiLCBcIjhcIiwgXCI5XCIsIFwiMTBcIiwgXCJKXCIsIFwiUVwiLCBcIktcIiwgXCJBXCJdO1xuXG5leHBvcnQgPSBMb2dFeHRyYWN0b3I7XG5cbmNsYXNzIExvZ0V4dHJhY3RvciB7XG4gICAgcHJpdmF0ZSBjYXJkc1VzZWQgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgIGdldENhcmRzVXNlZCgpOiBNYXA8c3RyaW5nLCBudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FyZHNVc2VkO1xuICAgIH1cbiAgICBnZXRTaW5nbGVQbGF5Q2FyZHMobG9nOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IG1hdGNoID0gbG9nLm1hdGNoKHBsYXlzU2luZ2xlUkUpO1xuXG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsKSB7IHJldHVybiBbXTsgfVxuXG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIHRvbyBtYW55IG1hdGNoZXMgXCIgKyBsb2cpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNhcmQgPSBtYXRjaFsxXVxuICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIHNpbmdsZSBcIiArIGNhcmQpO1xuICAgICAgICByZXR1cm4gW2NhcmRdO1xuICAgIH1cblxuICAgIGdldFBhaXJQbGF5Q2FyZHMobG9nOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IG1hdGNoID0gbG9nLm1hdGNoKHBsYXlzUGFpcnNSRSk7XG5cbiAgICAgICAgaWYgKG1hdGNoID09IG51bGwpIHsgcmV0dXJuIFtdOyB9XG5cbiAgICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgdG9vIG1hbnkgbWF0Y2hlcyBcIiArIGxvZylcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgcGFpciBcIiArIG1hdGNoWzFdKTtcbiAgICAgICAgcmV0dXJuIFttYXRjaFsxXSwgbWF0Y2hbMV1dO1xuICAgIH1cblxuICAgIGdldFRyaXBsZVBsYXlDYXJkcyhsb2c6IHN0cmluZyk6IHN0cmluZ1tdIHtcblxuICAgICAgICBsZXQgbWF0Y2ggPSBsb2cubWF0Y2gocGxheXNUcmlwbGVzUkUpO1xuXG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsKSB7IHJldHVybiBbXTsgfVxuXG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIHRvbyBtYW55IG1hdGNoZXMgXCIgKyBsb2cpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIHRyaXBsZSBcIiArIG1hdGNoWzFdKTtcbiAgICAgICAgcmV0dXJuIFttYXRjaFsxXSwgbWF0Y2hbMV0sIG1hdGNoWzFdXTtcbiAgICB9XG5cbiAgICBnZXRRdWFkQm9tYkNhcmRzKGxvZzogc3RyaW5nKTogc3RyaW5nW10ge1xuXG4gICAgICAgIGxldCBtYXRjaCA9IGxvZy5tYXRjaChwbGF5c1F1YWRCb21iUkUpO1xuXG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsKSB7IHJldHVybiBbXTsgfVxuXG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIHRvbyBtYW55IG1hdGNoZXMgXCIgKyBsb2cpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm9tYiA9IG1hdGNoWzFdO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgcXVhZCBcIiArIGJvbWIgKyBcIiBib21iXCIpO1xuICAgICAgICByZXR1cm4gW2JvbWIsIGJvbWIsIGJvbWIsIGJvbWJdO1xuICAgIH1cblxuXG5cbiAgICBnZXRDb25zZWN1dGl2ZVBhaXJzQ2FyZHMobG9nOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IG1hdGNoID0gbG9nLm1hdGNoKHBsYXlzQ29uc2VjdXRpdmVQYWlyc1JFKTtcblxuICAgICAgICBpZiAobWF0Y2ggPT0gbnVsbCkgeyByZXR1cm4gW107IH1cblxuICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCB0b28gbWFueSBtYXRjaGVzIFwiICsgbG9nKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBwYWlycyBcIiArIG1hdGNoWzFdICsgXCIgdG8gXCIgKyBtYXRjaFsyXSk7XG4gICAgICAgIHZhciBjYXJkczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBjYXJkIG9mIGNhcmRzUmFua2VkKSB7XG4gICAgICAgICAgICBpZiAoIXJlY29yZCAmJiBjYXJkID09IG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICBjYXJkcy5wdXNoKGNhcmQpO1xuICAgICAgICAgICAgICAgIGNhcmRzLnB1c2goY2FyZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FyZCA9PSBtYXRjaFsyXSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYXJkcztcbiAgICB9XG5cbiAgICBnZXRTdHJhaWdodENhcmRzKGxvZzogc3RyaW5nKTogc3RyaW5nW10ge1xuXG4gICAgICAgIGxldCBtYXRjaCA9IGxvZy5tYXRjaChwbGF5c1N0cmFpZ2h0UkUpO1xuXG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsKSB7IHJldHVybiBbXTsgfVxuXG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIHRvbyBtYW55IG1hdGNoZXMgXCIgKyBsb2cpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGFydCA9IG1hdGNoWzFdO1xuICAgICAgICBjb25zdCBlbmQgPSBtYXRjaFsyXTtcbiAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBzdHJhaWdodCBcIiArIHN0YXJ0ICsgXCIgdG8gXCIgKyBlbmQpO1xuICAgICAgICB2YXIgY2FyZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIHZhciByZWNvcmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgY2FyZCBvZiBjYXJkc1JhbmtlZCkge1xuICAgICAgICAgICAgaWYgKCFyZWNvcmQgJiYgY2FyZCA9PSBzdGFydCkge1xuICAgICAgICAgICAgICAgIHJlY29yZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgY2FyZHMucHVzaChjYXJkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYXJkID09IGVuZCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYXJkcztcbiAgICB9XG5cbiAgICBnZXRTdHJhaWdodEJvbWJDYXJkcyhsb2c6IHN0cmluZyk6IHN0cmluZ1tdIHtcblxuICAgICAgICBsZXQgbWF0Y2ggPSBsb2cubWF0Y2gocGxheXNTdHJhaWdodEJvbWJSRSk7XG5cbiAgICAgICAgaWYgKG1hdGNoID09IG51bGwpIHsgcmV0dXJuIFtdOyB9XG5cbiAgICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgdG9vIG1hbnkgbWF0Y2hlcyBcIiArIGxvZylcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbWF0Y2hbMV07XG4gICAgICAgIGNvbnN0IGVuZCA9IG1hdGNoWzJdO1xuICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIHN0cmFpZ2h0IGJvbWIgXCIgKyBzdGFydCArIFwiIHRvIFwiICsgZW5kKTtcbiAgICAgICAgdmFyIGNhcmRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICB2YXIgcmVjb3JkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGNhcmQgb2YgY2FyZHNSYW5rZWQpIHtcbiAgICAgICAgICAgIGlmICghcmVjb3JkICYmIGNhcmQgPT0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICByZWNvcmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlY29yZCkge1xuICAgICAgICAgICAgICAgIGNhcmRzLnB1c2goY2FyZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FyZCA9PSBlbmQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FyZHM7XG4gICAgfVxuXG4gICAgZ2V0RnVsbEhvdXNlQ2FyZHMobG9nOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IG1hdGNoID0gbG9nLm1hdGNoKHBsYXlzRnVsbEhvdXNlUkUpO1xuXG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsKSB7IHJldHVybiBbXTsgfVxuXG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIHRvbyBtYW55IG1hdGNoZXMgXCIgKyBsb2cpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmlwbGUgPSBtYXRjaFsxXTtcbiAgICAgICAgY29uc3QgZG91YmxlID0gbWF0Y2hbMl07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgZnVsbCBob3VzZSAzIFwiICsgdHJpcGxlICsgXCIgYW5kIDIgXCIgKyBkb3VibGUpO1xuXG4gICAgICAgIHJldHVybiBbdHJpcGxlLCB0cmlwbGUsIHRyaXBsZSwgZG91YmxlLCBkb3VibGVdO1xuICAgIH1cblxuXG4gICAgcHJvY2Vzc0xvZ1RleHQobG9nOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKG5ld1JvdW5kUkUudGVzdChsb2cpKSB7XG4gICAgICAgICAgICB0aGlzLmNhcmRzVXNlZC5jbGVhcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXNldGluZyBjYXJkIGNvdW50c1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjYXJkcyA9IHRoaXMuZ2V0Q29uc2VjdXRpdmVQYWlyc0NhcmRzKGxvZyk7XG4gICAgICAgIGlmIChjYXJkcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgY2FyZHMgPSB0aGlzLmdldFBhaXJQbGF5Q2FyZHMobG9nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNhcmRzID0gdGhpcy5nZXRUcmlwbGVQbGF5Q2FyZHMobG9nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNhcmRzID0gdGhpcy5nZXRTdHJhaWdodENhcmRzKGxvZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBjYXJkcyA9IHRoaXMuZ2V0RnVsbEhvdXNlQ2FyZHMobG9nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNhcmRzID0gdGhpcy5nZXRRdWFkQm9tYkNhcmRzKGxvZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBjYXJkcyA9IHRoaXMuZ2V0U3RyYWlnaHRCb21iQ2FyZHMobG9nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNhcmRzID0gdGhpcy5nZXRTaW5nbGVQbGF5Q2FyZHMobG9nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIGNhcmRzOiBcIiArIGNhcmRzKTtcbiAgICAgICAgZm9yIChsZXQgY2FyZCBvZiBjYXJkcykge1xuICAgICAgICAgICAgdGhpcy5jYXJkc1VzZWQuc2V0KGNhcmQsICh0aGlzLmNhcmRzVXNlZC5nZXQoY2FyZCkgPz8gMCkgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgTG9nRXh0cmFjdG9yIGZyb20gXCIuL2xvZ19leHRyYWN0b3JcIjtcblxuY29uc3QgbG9nRXh0cmFjdG9yID0gbmV3IExvZ0V4dHJhY3RvcigpO1xuLy8gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIG11dGF0aW9ucyBhcmUgb2JzZXJ2ZWRcbmNvbnN0IGNhbGxiYWNrID0gKG11dGF0aW9uTGlzdDogTXV0YXRpb25SZWNvcmRbXSwgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpID0+IHtcbiAgICBtdXRhdGlvbkxpc3RcbiAgICAgICAgLmZpbHRlcihtdXRhdGlvbiA9PiBtdXRhdGlvbi50eXBlID09PSBcImNoaWxkTGlzdFwiKVxuICAgICAgICAuZm9yRWFjaChub2RlID0+IG5vZGUuYWRkZWROb2Rlc1xuICAgICAgICAgICAgLmZvckVhY2goc3ViTm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IHN1Yk5vZGUudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGxvZ0V4dHJhY3Rvci5wcm9jZXNzTG9nVGV4dCh0ZXh0LnRvVXBwZXJDYXNlKCkpOyB9XG4gICAgICAgICAgICB9KSk7XG59O1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG4gICAgZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbmRlci50YWIgP1xuICAgICAgICAgICAgXCJmcm9tIGEgY29udGVudCBzY3JpcHQ6XCIgKyBzZW5kZXIudGFiLnVybCA6XG4gICAgICAgICAgICBcImZyb20gdGhlIGV4dGVuc2lvblwiKTtcbiAgICAgICAgY29uc29sZS5sb2cobG9nRXh0cmFjdG9yLmdldENhcmRzVXNlZCgpKTtcbiAgICAgICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSBcImdldENhcmRzXCIpXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoT2JqZWN0LmZyb21FbnRyaWVzKGxvZ0V4dHJhY3Rvci5nZXRDYXJkc1VzZWQoKSkpO1xuICAgIH1cbik7XG5cbi8vIENyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBsaW5rZWQgdG8gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG5jb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcblxuLy8gT3B0aW9ucyBmb3IgdGhlIG9ic2VydmVyICh3aGljaCBtdXRhdGlvbnMgdG8gb2JzZXJ2ZSlcbmNvbnN0IGNvbmZpZyA9IHsgY2hpbGRMaXN0OiB0cnVlIH07XG5cblxuLy8gU2VsZWN0IHRoZSBub2RlIHRoYXQgd2lsbCBiZSBvYnNlcnZlZCBmb3IgbXV0YXRpb25zXG5jb25zdCB0YXJnZXROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dzXCIpO1xuXG5pZiAodGFyZ2V0Tm9kZSkge1xuICAgIC8vIFN0YXJ0IG9ic2VydmluZyB0aGUgdGFyZ2V0IG5vZGUgZm9yIGNvbmZpZ3VyZWQgbXV0YXRpb25zXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBjb25maWcpO1xufVxuLypcbi8vIFNlbGVjdCB0aGUgbm9kZSB0aGF0IHdpbGwgYmUgb2JzZXJ2ZWQgZm9yIG11dGF0aW9uc1xuY29uc3QgdGFyZ2V0Tm9kZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlcGxheWxvZ3NcIik7XG5pZiAodGFyZ2V0Tm9kZTIpIHtcbiAgICAvLyBTdGFydCBvYnNlcnZpbmcgdGhlIHRhcmdldCBub2RlIGZvciBjb25maWd1cmVkIG11dGF0aW9uc1xuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZTIsIGNvbmZpZyk7XG5cbn0qLyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oOTU3KTtcbiJdLCJuYW1lcyI6WyJuZXdSb3VuZFJFIiwicGxheXNDb25zZWN1dGl2ZVBhaXJzUkUiLCJwbGF5c1BhaXJzUkUiLCJwbGF5c1RyaXBsZXNSRSIsInBsYXlzU3RyYWlnaHRSRSIsInBsYXlzRnVsbEhvdXNlUkUiLCJwbGF5c1F1YWRCb21iUkUiLCJwbGF5c1N0cmFpZ2h0Qm9tYlJFIiwicGxheXNTaW5nbGVSRSIsImNhcmRzUmFua2VkIiwiY2FyZHNVc2VkIiwiTWFwIiwiZ2V0Q2FyZHNVc2VkIiwidGhpcyIsImdldFNpbmdsZVBsYXlDYXJkcyIsImxvZyIsIm1hdGNoIiwibGVuZ3RoIiwiY29uc29sZSIsImNhcmQiLCJnZXRQYWlyUGxheUNhcmRzIiwiZ2V0VHJpcGxlUGxheUNhcmRzIiwiZ2V0UXVhZEJvbWJDYXJkcyIsImJvbWIiLCJnZXRDb25zZWN1dGl2ZVBhaXJzQ2FyZHMiLCJjYXJkcyIsInJlY29yZCIsInB1c2giLCJnZXRTdHJhaWdodENhcmRzIiwic3RhcnQiLCJlbmQiLCJnZXRTdHJhaWdodEJvbWJDYXJkcyIsImdldEZ1bGxIb3VzZUNhcmRzIiwidHJpcGxlIiwiZG91YmxlIiwicHJvY2Vzc0xvZ1RleHQiLCJ0ZXN0IiwiY2xlYXIiLCJzZXQiLCJnZXQiLCJsb2dFeHRyYWN0b3IiLCJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJyZXF1ZXN0Iiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwidGFiIiwidXJsIiwibWV0aG9kIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbkxpc3QiLCJmaWx0ZXIiLCJtdXRhdGlvbiIsInR5cGUiLCJmb3JFYWNoIiwibm9kZSIsImFkZGVkTm9kZXMiLCJzdWJOb2RlIiwidGV4dCIsInRleHRDb250ZW50IiwidG9VcHBlckNhc2UiLCJ0YXJnZXROb2RlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImNhbGwiXSwic291cmNlUm9vdCI6IiJ9