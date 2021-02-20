import toggleListeningAnimation from './animate_button.js';

// get transcript from user speech
const recognizeSpeech = async (lang, grammarStr) => {
  // check browser compatibility (Chrome only in this config)
  if (!window.webkitSpeechRecognition) {
    alert('Your browser doesn\'t support speech to text.\nTry Chrome 33+ :)');
  } else {
    // make a promise, to return text transcript when results processed and ready
    const promise = new Promise((resolve, reject) => {
      // create new instance of SpeechRecognition
      const recognition = new webkitSpeechRecognition();
      // config recognition language
      recognition.lang = lang;
      if(grammarStr) {
        console.log('Detected grammar: \n', grammarStr)
        const grammars = new webkitSpeechGrammarList();
        grammars.addFromString(grammarStr, 1);
        recognition.grammars = grammars;
      }

      // toggle animation of button on start/end
      recognition.onstart = (e) => {
        toggleListeningAnimation('add');
      }
      recognition.onend = () => {
        toggleListeningAnimation('remove');
      }
      // turn on mic and start recognizing user speech
      recognition.start();

      console.log({recognition})
      // on result of recognition, resolve promise with the transcript, if captured
      recognition.onresult = (event) => {

        if (event.results.length > 0) {
          resolve(event.results[0][0].transcript);
        }
        else {
          // or print this to console if something went wrong...
          reject('try again');
        }
      }
    });
    // return the result of fulfilled promise
    return await promise;
  }
};

export default recognizeSpeech;
