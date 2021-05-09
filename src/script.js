// getting the volume and volumelevel tag
const volume = document.getElementById("volume");
let volumelevel = document.getElementById("volumelevel");

// assining volumelevel HTML value volume.value
volumelevel.innerHTML = volume.value;

// on range input
volume.oninput = function () {
  // assining volumelevel HTML value this.value
  volumelevel.innerHTML = this.value;

  // sending the volume.value to content.js
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: volume.value });
  });
};
