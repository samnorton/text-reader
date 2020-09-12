const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]')
const options = document.querySelectorAll('[type="range"], [name="text"]');
const readButton = document.querySelector('#read');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function populateVoices(){
   voices = this.getVoices();
 //   console.log(voices);
 voicesDropdown.innerHTML = voices
 .map(voice => `<option value="${voice.name}">${voice.name}</option>`)
 .join('');
}

function setVoices(){
   // console.log(this.value);
   msg.voice = voices.find(voice => voice.name === this.value);
   toggle();
}

function toggle(startOver = false){
    speechSynthesis.cancel();
    if(startOver){
      speechSynthesis.speak(msg);
    }
    
}

function setOption(){
    console.log(this.name, this.value);
    msg[this.name] = this.value
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoices);
options.forEach(option => option.addEventListener('change', setOption));

readButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => {
    toggle(false);
});
