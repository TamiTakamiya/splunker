const CONFIG = new Map();
CONFIG.set(
  "open_splunk_prod",
  {
    title: "Open Splunk (prod)",
    url: "<Splunk URL excluding earliest, latest and sid query parameters>",
  }
);
CONFIG.set(
  "open_splunk_stage",
  {
    title: "Open Splunk (stage)",
    url: "<Splunk URL excluding earliest, latest and sid query parameters>",
  }
);

chrome.runtime.onInstalled.addListener(() => {
  CONFIG.forEach((value, key) => {
    chrome.contextMenus.create({
      id: key,
      title: value.title,
      contexts: ["selection"],
    });  
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (CONFIG.has(info.menuItemId)) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
          return getSelection().toString();
        }
      },
      function(result) { 
        openSplunk(info.menuItemId, result[0].result);
      },
    );
  }
});

function openSplunk(id, selection) {
  // Parse a timestamp in the format like
  // "Wed, 03 Jul 2024 22:15:14 GMT"
  if (selection) {
    const re = /(\d\d \w\w\w \d{4} \d\d:\d\d:\d\d GMT)/;
    const m = selection.match(re);  
    if (m) {
      const url = CONFIG.get(id).url;
      const epoch = Date.parse(m[1]) / 1000;
      const earliest = `${epoch - 1}.000`;
      const latest = `${epoch + 1}.000`;
      const timeQuery = `&earliest=${earliest}&latest=${latest}`;
      chrome.tabs.create({ url: url + timeQuery });
    }
  }
}
