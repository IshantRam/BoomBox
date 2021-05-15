// getting the volume and volumelevel tag
const volume = document.getElementById("volume");
let volumelevel = document.getElementById("volumelevel");

// getting Audio State tag
const audioState = document.getElementById("audioState");
let audioStateValue = document.getElementById("audioStateValue");

// on audio On or Off state Input
audioState.addEventListener("click", () => {
  // assining audioStateValue innerHTML audioState.checked value
  audioStateValue.innerHTML = audioState.checked ? "On" : "Off";
  // sending the audioState to the content.js
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: audioState.checked });
  });
});

// on range input
volume.oninput = function () {
  // assining volumelevel HTML value this.value
  volumelevel.innerHTML = this.value;

  // sending the volume.value to content.js
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: parseInt(volume.value) });
  });
};
