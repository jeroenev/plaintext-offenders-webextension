// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green.");
  });
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
      let offenders_list_raw = xhr.responseText;
      let offenders_list = offenders_list_raw.split('\n')
      offenders_list.shift();
      offenders_list.forEach(function(item) {
        let key, value; 
        [key,value] = item.split(',');
        let obj= {};
        obj[key] = value;
        chrome.storage.local.set(obj);
      });
    }
  }
  xhr.open("GET", "https://raw.githubusercontent.com/plaintextoffenders/plaintextoffenders/master/offenders.csv", true);
  xhr.send();
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});