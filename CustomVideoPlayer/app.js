const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
}

function setPauseButton() {
  play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
}
function setPlayButton() {
  play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
}
function updateTimestamp() {
  let measuredTime = new Date(null);
  measuredTime.setSeconds(video.currentTime); // specify value of SECONDS
  let MHSTime = measuredTime.toISOString().substr(14, 8);
  timestamp.innerText = MHSTime;
  const percent = (video.currentTime/video.duration)*100;
  progress.value = percent;
}

function stopPlayer() {
  video.currentTime = 0;
  video.pause();
}

function updateProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
  console.log(progress.value);
  updateTimestamp();
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', setPlayButton);
video.addEventListener('play', setPauseButton);
video.addEventListener('timeupdate', updateTimestamp);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopPlayer);
progress.addEventListener('change', updateProgress);