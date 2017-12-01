var price = '....',
request = {
   "event":"subscribe",
   "channel":"ticker",
   "pair":"IOTBTC"
};

chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
chrome.browserAction.setBadgeText({'text':price});
var webSocket = $.simpleWebSocket({ url: 'wss://api.bitfinex.com/ws/2/' });

webSocket.listen(function(message) {
    if (message[1] !== "hb" && message.length === 2) {
        price = message[1][6].toFixed(10);
		price = price.substring(5,10);
        chrome.browserAction.setBadgeText({ 'text': price });
    }
});

webSocket.send(request).done(function() {
}).fail(function(e) {
    webSocket = $.simpleWebSocket({ url: 'wss://api.bitfinex.com/ws/2/' });
});
