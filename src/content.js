// getting the aduio and video element in webpage
const audioelm = document.getElementsByTagName("audio");
const videoelm = document.getElementsByTagName("video");
let volumelevel = 50;

// change volume Function
const changeVolume = (volumelevel) => {
  // itrating over the audioelm array
  for (let audiodata of audioelm) {
    // assining each element volume volumelevl
    audiodata.volume = volumelevel;
  }

  // itrating over the videoelm array
  for (let videodata of videoelm) {
    // assining each element volume volumelevl
    videodata.volume = volumelevel;
  }

  return;
};

// mute Volume Function
const muteVolume = () => {
  // itrating over the audioelm array
  for (let audiodata of audioelm) {
    // assining each element volume 0
    audiodata.volume = 0;
  }

  // itrating over the videoelm array
  for (let videodata of videoelm) {
    // assining each element volume 0
    videodata.volume = 0;
  }

  return;
};

const defaultState = () => {
  // itrating over the audioelm array
  for (let audiodata of audioelm) {
    // assining each element volume 1
    audiodata.volume = 1;
  }

  // itrating over the videoelm array
  for (let videodata of videoelm) {
    // assining each element volume 1
    videodata.volume = 1;
  }
};

// every time reciving message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if message is true means audioState is on
  if (request.message == true) {
    // calling the defaultState Function
    defaultState();

    return;
  }
  // else if message is false means audioState is off
  else if (request.message == false) {
    // calling the muteVolume Function
    muteVolume();

    return;
  }
  // else assining it to volume level var by dividing it by 100
  volumelevel = request.message / 100;
  // calling the chageVolume Function
  changeVolume(volumelevel);

  return;
});
