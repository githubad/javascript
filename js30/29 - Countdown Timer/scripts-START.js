let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime =  document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const progressBar = document.querySelector('.progressbar');


// console.log(progressBar);
function setProgress(secondsLeft, totalSecs, then) {

  const secondsHere = Math.round((secondsLeft / totalSecs) * 100);
  document.documentElement.style.setProperty('--left', secondsHere + '%');
  document.documentElement.style.setProperty('--left', secondsHere + '%');
  progressBar.textContent = `${secondsHere}%`
}

function timer(seconds) {
  clearInterval(countdown);
// const now = (new Date()).getTime();
const now = Date.now();
const then = now + seconds * 1000;
displayTimeLeft(seconds);
displayEndTime(then);
const totalSecs = Math.round((then - Date.now()) / 1000);

countdown = setInterval(() => {
  const secondsLeft = Math.round((then - Date.now()) / 1000);
  if(secondsLeft < 0) {
    clearInterval(countdown);
    return;
  }
  // console.log(secondsLeft);
  displayTimeLeft(secondsLeft);
  setProgress(secondsLeft, totalSecs, then);

}, 1000);
// console.log(now, then);
}

function displayTimeLeft(seconds) {
  // const hours = Math.floor((seconds / 60) / 60);
  // const minutes = Math.floor ((seconds / 60 ) - ((hours * 60) * 60));
  // const secs = Math.floor(seconds - (minutes * 60));

  const minutes = Math.floor(seconds / 60);
  const remainderSecs = seconds % 60;
  const display = `${minutes}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  timerDisplay.textContent = display;
  document.title = display;
  // console.log(minutes, remainderSecs);

}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  let hours = end.getHours();
  const minutes =  end.getMinutes();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday' ,'Sunday'];
  const day = days[end.getDay() - 1];
  const date = end.getDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[end.getMonth()];
  const year = end.getFullYear();
  console.log(end.getDay())
  if(hours === 0) { hours = 12; }
  endTime.textContent = `Be Back at ${ hours > 12 ? hours - 12 : hours }:${minutes < 10 ? '0' : ''}${minutes} ${hours > 12 ? 'pm' : 'am'} ${month} ${date}, ${day}, ${year}`
}

function startTimer() {
  // console.log(this.dataset.time);
  const seconds = parseInt(this.dataset.time);

  timer(seconds);

}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  const seconds =  mins * 60;
  timer(seconds);
  this.reset();
});
