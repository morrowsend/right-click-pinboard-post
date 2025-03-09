
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveToPinboard",
    title: "Save to Pinboard",
    contexts: ["page", "link"]
  });

  chrome.contextMenus.create({
    id: "postSelectionToPinboard",
    title: "Post selection to Pinboard",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let url;
  if (info.menuItemId === "saveToPinboard") {
    url = `https://pinboard.in/add?url=${encodeURIComponent(info.linkUrl || tab.url)}&title=${encodeURIComponent(tab.title)}`;
  } else if (info.menuItemId === "postSelectionToPinboard") {
    url = `https://pinboard.in/add?url=${encodeURIComponent(tab.url)}&title=${encodeURIComponent(tab.title)}&description=${encodeURIComponent(info.selectionText || '')}`;
  }

  if (url) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        window.open(url, 'Pinboard', 'toolbar=no,scrollbars=yes,width=800,height=600');
      },
      args: [url]
    });
  }
});

