

//HTML 5 Video
//Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('#player__fullscreen');
//Functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();

  // if(video.paused) {
  //   video.play();
  // } else { video.pause(); }
}

function updateButton() {
  const icon = this.paused ? 'ᐅ' : '⋮⋮';
  toggle.textContent = icon;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;

}

function skip() {
// console.log(this.dataset.skip);
video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.name);
  // console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}


function fullScr() {
video.classList.toggle('full-width');
player.classList.toggle('full-width');
}

//Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach((n) => n.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mouseDown =  false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);

fullScreen.addEventListener('click', fullScr);
document.addEventListener('keyup', (e) => { if(e.keyCode == 27) fullScr(); })
