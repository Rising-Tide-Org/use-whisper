import { c, d, b } from './chunk-VO7VPLVP.js';
import { useEffectAsync, useMemoAsync } from '@chengsokdara/react-hooks-async';
import { useRef, useState, useEffect } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

var le={apiKey:"",autoStart:!1,autoTranscribe:!0,mode:"transcriptions",nonStop:!1,removeSilence:!1,stopTimeout:5e3,streaming:!1,timeSlice:1e3,onDataAvailable:void 0,onTranscribe:void 0,ffmpegCoreURL:b},me={stop:void 0},ge={blob:void 0,text:void 0},Te=$=>{let{apiKey:w,autoStart:C,autoTranscribe:v,mode:h,nonStop:U,removeSilence:j,stopTimeout:z,streaming:S,timeSlice:N,whisperConfig:c$1,onDataAvailable:G,onTranscribe:T,ffmpegCoreURL:J}={...le,...$};if(!w&&!T)throw new Error("apiKey is required if onTranscribe is not provided");let m=useRef([]),i=useRef(),s=useRef(),t=useRef(),a=useRef(),g=useRef(me),[Q,R]=useState(!1),[V,A]=useState(!1),[X,p]=useState(!1),[B,b]=useState(ge),[Y,W]=useState(!1),x=useRef(),[E,Z]=useState(!1),ee=async()=>{let e=createFFmpeg({mainName:"main",corePath:J,log:!0});x.current=e,e.isLoaded()||await e.load(),Z(!0);};useEffect(()=>()=>{m.current&&(m.current=[]),i.current&&(i.current.flush(),i.current=void 0),t.current&&(t.current.destroy(),t.current=void 0),y("stop"),s.current&&(s.current.off("speaking",k),s.current.off("stopped_speaking",F)),a.current&&(a.current.getTracks().forEach(e=>e.stop()),a.current=void 0);},[]),useEffectAsync(async()=>{C&&await D();},[C]);let re=async()=>{await D();},te=async()=>{await ie();},ne=async()=>{await L();},oe=async()=>{await P();},D=async()=>{try{if(E||ee(),a.current||await ae(),a.current){if(!t.current){let{default:{RecordRTCPromisesHandler:r,StereoAudioRecorder:n}}=await import('recordrtc'),o={mimeType:"audio/wav",numberOfAudioChannels:1,recorderType:n,sampleRate:44100,timeSlice:S?N:void 0,type:"audio",ondataavailable:v&&S?ce:void 0};t.current=new r(a.current,o);}if(!i.current){let{Mp3Encoder:r}=await import('lamejs');i.current=new r(1,44100,96);}let e=await t.current.getState();(e==="inactive"||e==="stopped")&&await t.current.startRecording(),e==="paused"&&await t.current.resumeRecording(),U&&H("stop"),R(!0);}}catch{}},ae=async()=>{try{if(a.current&&a.current.getTracks().forEach(e=>e.stop()),a.current=await navigator.mediaDevices.getUserMedia({audio:!0}),!s.current){let{default:e}=await import('hark');s.current=e(a.current,{interval:100,play:!1}),s.current.on("speaking",k),s.current.on("stopped_speaking",F);}}catch{}},H=e=>{g.current[e]||(g.current[e]=setTimeout(L,z));},k=()=>{A(!0),y("stop");},F=()=>{A(!1),U&&H("stop");},ie=async()=>{try{t.current&&(await t.current.getState()==="recording"&&await t.current.pauseRecording(),y("stop"),R(!1));}catch{}},L=async()=>{try{if(t.current){let e=await t.current.getState();if((e==="recording"||e==="paused")&&await t.current.stopRecording(),se(),y("stop"),R(!1),v)await P();else {let r=await t.current.getBlob();b({blob:r});}await t.current.destroy(),m.current=[],i.current&&(i.current.flush(),i.current=void 0),t.current=void 0;}}catch{}},se=()=>{s.current&&(s.current.off("speaking",k),s.current.off("stopped_speaking",F),s.current=void 0),a.current&&(a.current.getTracks().forEach(e=>e.stop()),a.current=void 0);},y=e=>{g.current[e]&&(clearTimeout(g.current[e]),g.current[e]=void 0);},_=async e=>{if(typeof T=="function"){let r=await T(e);b(r);}else {let r=new File([e],"speech.mp3",{type:"audio/mpeg"}),n=await I(r);b({blob:e,text:n}),W(n===void 0);}},P=async()=>{try{if(i.current&&t.current){if(await t.current.getState()==="stopped"){p(!0);let r=await t.current.getBlob();if(j&&E){let n=await r.arrayBuffer(),o=x.current;if(o){o.FS("writeFile","in.wav",new Uint8Array(n)),await o.run("-i","in.wav","-acodec","libmp3lame","-b:a","96k","-ar","44100","-af",c,"out.mp3");let d=o.FS("readFile","out.mp3");if(d.length<=358){b({blob:r}),p(!1);return}r=new Blob([d.buffer],{type:"audio/mpeg"});}}else {let n=await r.arrayBuffer(),o=i.current.encodeBuffer(new Int16Array(n));r=new Blob([o],{type:"audio/mpeg"});}await _(r),p(!1);}}else {let{blob:e}=B;e&&(p(!0),await _(e),p(!1));}}catch{p(!1);}},ce=async e=>{try{if(S&&t.current){if(G?.(e),i.current){let n=await e.arrayBuffer(),o=i.current.encodeBuffer(new Int16Array(n)),u=new Blob([o],{type:"audio/mpeg"});m.current.push(u);}if(await t.current.getState()==="recording"){let n=new Blob(m.current,{type:"audio/mpeg"}),o=new File([n],"speech.mp3",{type:"audio/mpeg"}),u=await I(o);u&&b(d=>({...d,text:u}));}}}catch{}},I=useMemoAsync(async e=>{let r=new FormData;r.append("file",e),r.append("model","whisper-1"),h==="transcriptions"&&r.append("language",c$1?.language??"en"),c$1?.prompt&&r.append("prompt",c$1.prompt),c$1?.response_format&&r.append("response_format",c$1.response_format),c$1?.temperature&&r.append("temperature",`${c$1.temperature}`);let n={};n["Content-Type"]="multipart/form-data",w&&(n.Authorization=`Bearer ${w}`);let{default:o}=await import('axios'),{default:u}=await import('axios-retry');u(o,{retries:3,retryDelay:u.exponentialDelay});try{return (await o.post(d+h,r,{headers:n})).data.text}catch{return}},[w,h,c$1]);return {recording:Q,speaking:V,transcribing:X,transcript:B,isTranscribingError:Y,pauseRecording:te,startRecording:re,stopRecording:ne,startTranscribing:oe}};

export { Te as a };
