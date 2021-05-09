// getting the aduio and video element in webpage
const audioelm = document.getElementsByTagName("audio");
const videoelm = document.getElementsByTagName("video");
let volumelevel = 0;

// every time reciving volumelevel
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // assining it to volume level var by dividing it by 100
  volumelevel = request.message / 100;

  // if audio element length != 0
  if (audioelm.length != 0) {
    // itrating over the audioelm array
    for (let audiodata of audioelm) {
      // assining each element volume volumelevl
      audiodata.volume = volumelevel;
    }
  }

  // if video element length != 0
  if (videoelm.length != 0) {
    // itrating over the videoelm array
    for (let videodata of videoelm) {
      // assining each element volume volumelevl
      videodata.volume = volumelevel;
    }
  }
});
