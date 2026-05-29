import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  recognition:any;
  isListening=false;

  constructor(){

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if(SpeechRecognition){

      this.recognition = new SpeechRecognition();

      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN';

      this.recognition.onstart = ()=>{
        this.isListening=true;
        console.log('Listening started');
      };

      this.recognition.onresult=(event:any)=>{

        const text =
          event.results[0][0].transcript;

        console.log('Recognized:',text);

        if(this.callback){
          this.callback(text);
        }

      };

      this.recognition.onerror=(event:any)=>{
        console.log('Speech Error:',event.error);

        this.isListening=false;
      };

      this.recognition.onend=()=>{
        console.log('Listening ended');
        this.isListening=false;
      };
    }
  }

  callback:any;

  startListening(callback:(text:string)=>void){

    this.callback=callback;

    if(this.recognition){
      this.recognition.start();
    }
  }

}