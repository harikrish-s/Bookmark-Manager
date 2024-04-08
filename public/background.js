chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getTabs') {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {27
        const urls = tabs.map((tab) => tab.url);
        sendResponse({ tabs: urls });
      });
    }
    return true;
  });