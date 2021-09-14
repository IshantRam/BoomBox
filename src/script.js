// getting the volume and volumelevel tag
const volume = document.getElementById("volume");
let volumelevel = document.getElementById("volumelevel");
// If the volumelevel is alerady stored in localstorage
if (localStorage.getItem("volumelevel") != undefined) {
  // than setting volumelevl to the stored value
  volumelevel.innerHTML = localStorage.getItem("volumelevel");
}

// getting Audio State tag
const audioState = document.getElementById("audioState");
let audioStateValue = document.getElementById("audioStateValue");
// If the audioState is alerady stored in localstorage
if (localStorage.getItem("audioState") != undefined) {
  // than setting audiostate to the stored value
  audioStateValue.innerHTML = localStorage.getItem("audioState");
  audioState.checked = localStorage.getItem("audioState") === "On" ? 1 : 0;
}

// on audio On or Off state Input
audioState.addEventListener("click", () => {
  localStorage.setItem("audioState", audioState.checked ? "On" : "Off");

  // assining audioStateValue innerHTML audioState.checked value
  audioStateValue.innerHTML = audioState.checked ? "On" : "Off";
  // sending the audioState to the content.js
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: { type: "AudioState", key: audioState.checked },
    });
  });
});

// on range input
volume.oninput = function () {
  localStorage.setItem("volumelevel", this.value);

  // assining volumelevel HTML value this.value
  volumelevel.innerHTML = this.value;
  // updating the audioState and localstorage
  if (this.value == 0) {
    audioState.checked = 0;
    audioStateValue.innerHTML = "Off";
    localStorage.setItem("audioState", "Off");
  } else {
    audioState.checked = 1;
    audioStateValue.innerHTML = "On"
    localStorage.setItem("audioState", "On");
  }
  
  // sending the volume.value to content.js
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: { type: "Volumelevel", key: parseInt(volume.value) },
    });
  });
};
