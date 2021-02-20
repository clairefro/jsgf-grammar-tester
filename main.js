import recognizeSpeech from './speechToText.js';


/////////////////////////////////////
// get html elements
/////////////////////////////////////

const langSelector = document.getElementById('lang-select');
const grammarInput = document.getElementById('grammar-input');

const recognizeButton = document.getElementById('stt-button');
const sttTextbox = document.getElementById('stt-textbox');

recognizeButton.addEventListener('click', (e) => {
  // clear textbox
  sttTextbox.value = "";
  // let user know mic is on
  sttTextbox.placeholder = "listening..."

  const lang = langSelector.value;
  const grammarStr = grammarInput.value;
  console.log({grammarStr})

  // call our method to get transcript from speech
  recognizeSpeech(lang, grammarStr)
    // then display the transcript to the textbox when ready
    .then((result) => {
      sttTextbox.value = result;
    });
});
