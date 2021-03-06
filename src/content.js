// getting the aduio and video element in webpage
const audioelm = document.getElementsByTagName("audio");
const videoelm = document.getElementsByTagName("video");

// is Playable Function
const isPlayable = () => {
  // if audioelm.length == 0 && videoelm.length == 0
  if (audioelm.length == 0 && videoelm.length == 0) {
    return false;
  }

  // else
  return true;
};

// set State Function
const setState = (volumelevel) => {
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

// get State Function
const getState = () => {
  // value array
  const value = [];

  // itrating over the audioelm array and storing the value in value array
  for (let audiodata of audioelm) {
    value.push(audiodata.volume);
  }

  // itrating over the videoelm array and storing the value in value array
  for (let videodata of videoelm) {
    value.push(videodata.volume);
  }

  // avaraging the value
  let avarage = 0.0;
  for (let i = 0; i < value.length; i++) {
    avarage += value[i];
  }
  avarage = avarage / value.length;

  // returining the avarage
  return avarage;
};

// ..
let volumelevel = getState();
let lastState = getState();

// every time reciving message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if the page do not contains audio or video tag
  if (!isPlayable()) {
    return;
  }

  // If message type is Volumelevel
  if (request.message.type == "Volumelevel") {
    volumelevel = request.message.key / 100;
    setState(volumelevel);
  }

  // If message type is AudioState and key is false
  else if (request.message.type == "AudioState" && !request.message.key) {
    lastState = getState();
    setState(0);
  }

  // If message type is AudioState and key is true
  else if (request.message.type == "AudioState" && request.message.key) {
    setState(lastState);
  }

  return;
});
