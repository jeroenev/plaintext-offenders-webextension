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
        offenders_list.forEach(function (item) {
          let key, value, garbage;
          [key, value] = item.split(',');
          [key, garbage] = key.split('/')
          let obj = {};
          obj[key] = value;
          chrome.storage.local.set(obj);
        });
      }
    }
    xhr.open("GET", "https://raw.githubusercontent.com/plaintextoffenders/plaintextoffenders/master/offenders.csv", true);
    xhr.send();
  }

  function checkTabUrl(tabId, changeInfo, tab) {
    if (changeInfo.url && (changeInfo.url.startsWith("http://") || changeInfo.url.startsWith("https://"))) {
      let url = new URL(changeInfo.url)
      let urldomains = url.hostname.split(".")
      let base
      let sub_base
      let sub_sub_base
      if (urldomains.length > 1) {
        base = urldomains[urldomains.length - 2] + "." + urldomains[urldomains.length - 1]
        chrome.storage.local.get(base, function (data) {
          let key = Object.keys(data)
          if (key.length) {
            let url = data[key[0]]
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
      if (urldomains.length > 2) {
        sub_base = urldomains[urldomains.length - 3] + "." + base
        chrome.storage.local.get(sub_base, function (data) {
          let key = Object.keys(data)
          if (key.length) {
            let url = data[key[0]]
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
      if (urldomains.length > 3) {
        sub_sub_base = urldomains[urldomains.length - 4] + "." + sub_base
        chrome.storage.local.get(sub_sub_base, function (data) {
          let key = Object.keys(data)
          if (key.length) {
            let url = data[key[0]]
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
  }

  chrome.runtime.onInstalled.addListener(updateOffendersList);
  chrome.runtime.onStartup.addListener(updateOffendersList);
  chrome.tabs.onUpdated.addListener(checkTabUrl);
})(this);