const toggleBtn = document.getElementById('toggle');
const showBox = document.querySelector('.show-box');
const icon = document.querySelector('.icon');
const selectVoice = document.getElementById('select-voice');
const enteredText = document.getElementById('intered-text');
const resetBtn = document.getElementById('reset-btn');
const allConts = document.querySelectorAll('.small-cont');

//define speech Syncthesis
const synth = window.speechSynthesis;

//To open and close box opn when click the button and close when click icon and I use attribute working to disable btn when showing the box
const toggleBox = () => {
  if (showBox.getAttribute('working') === 'false') {
    showBox.classList.add('show');
    toggleBtn.disabled = true;
    showBox.setAttribute('working', 'true');
  } else if (showBox.getAttribute('working') === 'true') {
    showBox.classList.remove('show');
    toggleBtn.disabled = false;
    showBox.setAttribute('working', 'false');
  }
};

let voices = [];

function loadAllVoices() {
  voices = synth.getVoices();
  //Here I load all voices and create option with every voice
  for (const voice of voices) {
    const option = document.createElement('option');
    option.textContent = `${voice.name} ${voice.lang}`;
    if (voice.default) {
      option.textContent += ' — DEFAULT';
    }
    selectVoice.appendChild(option);
  }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadAllVoices;
}

loadAllVoices();

//I target all texts to use it for speak
function loopConts() {
  allConts.forEach((cont) => {
    cont.addEventListener('click', (event) => {
      const parent = event.target.parentElement;
      const text = parent.querySelector('p').textContent;
      speakHandler(text);
    });
  });
}

loopConts();

function speakHandler(text) {
  //first I pass a text
  const utterThis = new SpeechSynthesisUtterance(text);
  const currentVoice = selectVoice.value;
  for (const voice of voices) {
    if (currentVoice === `${voice.name} ${voice.lang}`) {
      //to make voice working ,I Should pass object of voice
      utterThis.voice = voice;
    }
  }
  //finally after pass text and voice we pass text
  synth.speak(utterThis);
}

//Event Listeners
toggleBtn.addEventListener('click', toggleBox);
icon.addEventListener('click', toggleBox);
resetBtn.addEventListener('click', () => {
  const text = enteredText.value;
  speakHandler(text);
});
