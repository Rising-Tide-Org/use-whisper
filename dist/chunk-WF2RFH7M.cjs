'use strict';

var chunk57AVKP4H_cjs = require('./chunk-57AVKP4H.cjs');
var reactHooksAsync = require('@chengsokdara/react-hooks-async');
var react = require('react');
var ffmpeg = require('@ffmpeg/ffmpeg');

var le={apiKey:"",autoStart:!1,autoTranscribe:!0,mode:"transcriptions",nonStop:!1,removeSilence:!1,stopTimeout:5e3,streaming:!1,timeSlice:1e3,onDataAvailable:void 0,onTranscribe:void 0,ffmpegCoreURL:chunk57AVKP4H_cjs.b},me={stop:void 0},ge={blob:void 0,text:void 0},Te=$=>{let{apiKey:b,autoStart:v,autoTranscribe:U,mode:h,nonStop:A,removeSilence:j,stopTimeout:z,streaming:S,timeSlice:N,whisperConfig:c,onDataAvailable:G,onTranscribe:T,ffmpegCoreURL:J}={...le,...$};if(!b&&!T)throw new Error("apiKey is required if onTranscribe is not provided");let m=react.useRef([]),i=react.useRef(),s=react.useRef(),t=react.useRef(),a=react.useRef(),g=react.useRef(me),[Q,R]=react.useState(!1),[V,x]=react.useState(!1),[X,p]=react.useState(!1),[B,w]=react.useState(ge),[Y,Z]=react.useState(!1),W=react.useRef(),[E,k]=react.useState(!1),ee=async()=>{let e=ffmpeg.createFFmpeg({mainName:"main",corePath:J,log:!0});W.current=e,e.isLoaded()||await e.load(),k(!0);};react.useEffect(()=>()=>{m.current&&(m.current=[]),i.current&&(i.current.flush(),i.current=void 0),t.current&&(t.current.destroy(),t.current=void 0),y("stop"),s.current&&(s.current.off("speaking",F),s.current.off("stopped_speaking",C)),a.current&&(a.current.getTracks().forEach(e=>e.stop()),a.current=void 0);},[]),reactHooksAsync.useEffectAsync(async()=>{v&&await D();},[v]);let re=async()=>{await D();},te=async()=>{await ie();},ne=async()=>{await L();},oe=async()=>{await P();},D=async()=>{try{if(E||ee(),a.current||await ae(),a.current){if(!t.current){let{default:{RecordRTCPromisesHandler:r,StereoAudioRecorder:n}}=await import('recordrtc'),o={mimeType:"audio/wav",numberOfAudioChannels:1,recorderType:n,sampleRate:44100,timeSlice:S?N:void 0,type:"audio",ondataavailable:U&&S?ce:void 0};t.current=new r(a.current,o);}if(!i.current){let{Mp3Encoder:r}=await import('lamejs');i.current=new r(1,44100,96);}let e=await t.current.getState();(e==="inactive"||e==="stopped")&&await t.current.startRecording(),e==="paused"&&await t.current.resumeRecording(),A&&H("stop"),R(!0);}}catch{}},ae=async()=>{try{if(a.current&&a.current.getTracks().forEach(e=>e.stop()),a.current=await navigator.mediaDevices.getUserMedia({audio:!0}),!s.current){let{default:e}=await import('hark');s.current=e(a.current,{interval:100,play:!1}),s.current.on("speaking",F),s.current.on("stopped_speaking",C);}}catch{}},H=e=>{g.current[e]||(g.current[e]=setTimeout(L,z));},F=()=>{x(!0),y("stop");},C=()=>{x(!1),A&&H("stop");},ie=async()=>{try{t.current&&(await t.current.getState()==="recording"&&await t.current.pauseRecording(),y("stop"),R(!1));}catch{}},L=async()=>{try{if(t.current){let e=await t.current.getState();if((e==="recording"||e==="paused")&&await t.current.stopRecording(),se(),y("stop"),R(!1),U)await P();else {let r=await t.current.getBlob();w({blob:r});}await t.current.destroy(),m.current=[],i.current&&(i.current.flush(),i.current=void 0),t.current=void 0;}}catch{}},se=()=>{s.current&&(s.current.off("speaking",F),s.current.off("stopped_speaking",C),s.current=void 0),a.current&&(a.current.getTracks().forEach(e=>e.stop()),a.current=void 0);},y=e=>{g.current[e]&&(clearTimeout(g.current[e]),g.current[e]=void 0);},_=async e=>{let r;if(typeof T=="function"){let{text:n}=await T(e);r=n;}else {let n=new File([e],"speech.mp3",{type:"audio/mpeg"});r=await I(n);}w({blob:e,text:r}),Z(r===void 0);},P=async()=>{try{if(i.current&&t.current){if(await t.current.getState()==="stopped"){p(!0);let r=await t.current.getBlob();if(j&&E){let n=await r.arrayBuffer(),o=W.current;if(o){o.FS("writeFile","in.wav",new Uint8Array(n)),await o.run("-i","in.wav","-acodec","libmp3lame","-b:a","96k","-ar","44100","-af",chunk57AVKP4H_cjs.c,"out.mp3");let d=o.FS("readFile","out.mp3");if(d.length<=358){o.exit(),k(!1),w({blob:r}),p(!1);return}r=new Blob([d.buffer],{type:"audio/mpeg"}),o.exit(),k(!1);}}else {let n=await r.arrayBuffer(),o=i.current.encodeBuffer(new Int16Array(n));r=new Blob([o],{type:"audio/mpeg"});}await _(r),p(!1);}}else {let{blob:e}=B;e&&(p(!0),await _(e),p(!1));}}catch{p(!1);}},ce=async e=>{try{if(S&&t.current){if(G?.(e),i.current){let n=await e.arrayBuffer(),o=i.current.encodeBuffer(new Int16Array(n)),u=new Blob([o],{type:"audio/mpeg"});m.current.push(u);}if(await t.current.getState()==="recording"){let n=new Blob(m.current,{type:"audio/mpeg"}),o=new File([n],"speech.mp3",{type:"audio/mpeg"}),u=await I(o);u&&w(d=>({...d,text:u}));}}}catch{}},I=reactHooksAsync.useMemoAsync(async e=>{let r=new FormData;r.append("file",e),r.append("model","whisper-1"),h==="transcriptions"&&r.append("language",c?.language??"en"),c?.prompt&&r.append("prompt",c.prompt),c?.response_format&&r.append("response_format",c.response_format),c?.temperature&&r.append("temperature",`${c.temperature}`);let n={};n["Content-Type"]="multipart/form-data",b&&(n.Authorization=`Bearer ${b}`);let{default:o}=await import('axios'),{default:u}=await import('axios-retry');u(o,{retries:3,retryDelay:u.exponentialDelay});try{return (await o.post(chunk57AVKP4H_cjs.d+h,r,{headers:n})).data.text}catch{return}},[b,h,c]);return {recording:Q,speaking:V,transcribing:X,transcript:B,isTranscribingError:Y,pauseRecording:te,startRecording:re,stopRecording:ne,startTranscribing:oe}};

exports.a = Te;
