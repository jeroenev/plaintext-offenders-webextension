// Copyright 2018 Jeroen Evens. All rights reserved.

"use strict";

(function (global) {
  function updateOffendersList() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        console.log(xhr.responseText);
        let offenders_list_raw = xhr.responseText;
        let offenders_list = offenders_list_raw.split('\n')
        offenders_list.shift();
        offenders_dict  = {};
        offenders_list.forEach(function (item) {
          let key, value, garbage;
          [key, value] = item.split(',');
          [key, garbage] = key.split('/')
          offenders_dict[key] = value;
        });
        chrome.storage.local.set({'offenders': offenders_dict});
      }
    }
    xhr.open("GET", "https://raw.githubusercontent.com/plaintextoffenders/plaintextoffenders/master/offenders.csv", true);
    xhr.send();
  }

  function checkTabUrl(tabId, changeInfo, tab) {
    if (changeInfo.url && (changeInfo.url.startsWith("http://") || changeInfo.url.startsWith("https://"))) {
      let url = new URL(changeInfo.url)
      let urldomains = url.hostname.split(".")
      let base = urldomains.join('.')
      let sub_base = urldomains.split('.').slice(1).join('.')
      let sub_sub_base = urldomains.split('.').slice(2).join('.')
      chrome.storage.local.get('offenders', function (data) {
        if (data[base] || data[sub_base] || data[sub_sub_base]) {
          chrome.tabs.executeScript(tab.id, {
            code: 'var plaintext = "' + url + '";'
          }, function() {
            chrome.tabs.executeScript(
            tabId,
            { file: 'content.js' });
          });
        }
      });
    }
  }
  chrome.runtime.onInstalled.addListener(updateOffendersList);
  chrome.runtime.onStartup.addListener(updateOffendersList);
  chrome.tabs.onUpdated.addListener(checkTabUrl);
})(this);