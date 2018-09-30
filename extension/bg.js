chrome.browserAction.onClicked.addListener(function (tab) { //Fired when the user clicks the extension's icon
      chrome.tabs.create({ url: "about://newtab" });
      //chrome.tabs.create({ url: "app/index.html" });
});
chrome.runtime.onInstalled.addListener(function() {
	let defaults={
		interleavingTrigger: 2, 
		lastDeck:"", 
		interleavingDisabled:false, 
		betaEnabled:false, 
		deckNames:{}, 
		excludedDecks:[]
	};
	chrome.storage.local.get(Object.keys(defaults), function(result) {
		for(let s in result){
			delete defaults[s];
		}
		chrome.storage.local.set(defaults, function() {}); //Set missing default values
	});
});
chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
		  console.log(details.requestHeaders[i].name);
            if (details.requestHeaders[i].name === 'Origin') {
              details.requestHeaders.splice(i, 1);
              break;
            }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]
);
