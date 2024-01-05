'use strict';

var chunk57AVKP4H_cjs = require('./chunk-57AVKP4H.cjs');
var reactHooksAsync = require('@chengsokdara/react-hooks-async');
var react = require('react');
var ffmpeg = require('@ffmpeg/ffmpeg');

var we={apiKey:"",autoStart:!1,autoTranscribe:!0,mode:"transcriptions",nonStop:!1,removeSilence:!1,stopTimeout:5e3,streaming:!1,timeSlice:1e3,onDataAvailable:void 0,onTranscribe:void 0,ffmpegCoreURL:chunk57AVKP4H_cjs.b},ye={stop:void 0},J={blob:void 0,text:void 0},Fe=Q=>{let{apiKey:w,autoStart:U,autoTranscribe:A,mode:T,nonStop:x,removeSilence:B,stopTimeout:V,streaming:R,timeSlice:X,whisperConfig:u,onDataAvailable:Y,onTranscribe:l,ffmpegCoreURL:Z}={...we,...Q};if(!w&&!l)throw new Error("apiKey is required if onTranscribe is not provided");let m=react.useRef([]),i=react.useRef(),s=react.useRef(),t=react.useRef(),a=react.useRef(),g=react.useRef(ye),[ee,k]=react.useState(!1),[y,W]=react.useState(!1),E=react.useRef(y),[re,p]=react.useState(!1),[D,b]=react.useState(J),[te,H]=react.useState(!1);react.useEffect(()=>{E.current=y;},[y]);let L=react.useRef(),[_,F]=react.useState(!1),ne=async()=>{let e=ffmpeg.createFFmpeg({mainName:"main",corePath:Z,log:!0});L.current=e,e.isLoaded()||await e.load(),F(!0);};react.useEffect(()=>()=>{m.current&&(m.current=[]),i.current&&(i.current.flush(),i.current=void 0),t.current&&(t.current.destroy(),t.current=void 0),h("stop"),s.current&&(s.current.off("speaking",C),s.current.off("stopped_speaking",v)),a.current&&(a.current.getTracks().forEach(e=>e.stop()),a.current=void 0);},[]),reactHooksAsync.useEffectAsync(async()=>{U&&await P();},[U]);let oe=async()=>{await P();},ae=async()=>{await pe();},ie=async()=>{await M();},se=async()=>{await K();},ce=()=>{H(!1);},ue=()=>{b(J);},P=async()=>{try{if(!_&&B&&ne(),a.current||await fe(),!i.current){let{Mp3Encoder:e}=await import('lamejs');i.current=new e(1,44100,96);}if(a.current){if(!t.current){let{default:{RecordRTCPromisesHandler:r,StereoAudioRecorder:o}}=await import('recordrtc'),n={mimeType:"audio/wav",numberOfAudioChannels:1,recorderType:o,sampleRate:44100,timeSlice:R?X:void 0,type:"audio",ondataavailable:A&&R?le:void 0};t.current=new r(a.current,n);}let e=await t.current.getState();(e==="inactive"||e==="stopped")&&await t.current.startRecording(),e==="paused"&&await t.current.resumeRecording(),x&&I("stop"),k(!0);}}catch{}},fe=async()=>{try{if(a.current&&a.current.getTracks().forEach(e=>e.stop()),a.current=await navigator.mediaDevices.getUserMedia({audio:!0}),!s.current){let{default:e}=await import('hark');s.current=e(a.current,{interval:100,play:!1}),s.current.on("speaking",C),s.current.on("stopped_speaking",v);}}catch{}},I=e=>{g.current[e]||(g.current[e]=setTimeout(M,V));},C=()=>{W(!0),h("stop");},v=()=>{W(!1),x&&I("stop");},pe=async()=>{try{t.current&&(await t.current.getState()==="recording"&&await t.current.pauseRecording(),h("stop"),k(!1));}catch{}},M=async()=>{try{if(t.current){let e=await t.current.getState();if((e==="recording"||e==="paused")&&await t.current.stopRecording(),de(),h("stop"),k(!1),A)await K();else {let r=await t.current.getBlob();b({blob:r});}await t.current.destroy(),m.current=[],i.current&&(i.current.flush(),i.current=void 0),t.current=void 0;}}catch{}},de=()=>{s.current&&(s.current.off("speaking",C),s.current.off("stopped_speaking",v),s.current=void 0),a.current&&(a.current.getTracks().forEach(e=>e.stop()),a.current=void 0);},h=e=>{g.current[e]&&(clearTimeout(g.current[e]),g.current[e]=void 0);},q=async e=>{let r;if(typeof l=="function"){let{text:o}=await l(e);r=o;}else {let o=new File([e],"speech.mp3",{type:"audio/mpeg"});r=await O(o);}b({blob:e,text:r}),H(r===void 0);},K=async()=>{try{if(i.current&&t.current){if(await t.current.getState()==="stopped"){p(!0);let r=await t.current.getBlob();if(B&&_){let o=await r.arrayBuffer(),n=L.current;if(n){n.FS("writeFile","in.wav",new Uint8Array(o)),await n.run("-i","in.wav","-acodec","libmp3lame","-b:a","96k","-ar","44100","-af",chunk57AVKP4H_cjs.c,"out.mp3");let S=n.FS("readFile","out.mp3");if(S.length<=358){n.exit(),F(!1),b({blob:r}),p(!1);return}r=new Blob([S.buffer],{type:"audio/mpeg"}),n.exit(),F(!1);}}else {let o=await r.arrayBuffer(),n=i.current.encodeBuffer(new Int16Array(o));r=new Blob([n],{type:"audio/mpeg"});}await q(r),p(!1);}}else {let{blob:e}=D;e&&(p(!0),await q(e),p(!1));}}catch{p(!1);}},le=async e=>{try{if(R&&t.current&&E.current){if(Y?.(e),i.current){let o=await e.arrayBuffer(),n=i.current.encodeBuffer(new Int16Array(o)),c=new Blob([n],{type:"audio/mpeg"});m.current.push(c);}if(await t.current.getState()==="recording"){let o=new Blob(m.current,{type:"audio/mpeg"}),n;if(typeof l=="function"){let{text:c}=await l(o);n=c;}else {let c=new File([o],"speech.mp3",{type:"audio/mpeg"});n=await O(c);}n&&b(c=>({...c,text:n}));}}}catch{}},O=reactHooksAsync.useMemoAsync(async e=>{let r=new FormData;r.append("file",e),r.append("model","whisper-1"),T==="transcriptions"&&r.append("language",u?.language??"en"),u?.prompt&&r.append("prompt",u.prompt),u?.response_format&&r.append("response_format",u.response_format),u?.temperature&&r.append("temperature",`${u.temperature}`);let o={};o["Content-Type"]="multipart/form-data",w&&(o.Authorization=`Bearer ${w}`);let{default:n}=await import('axios'),{default:c}=await import('axios-retry');c(n,{retries:3,retryDelay:c.exponentialDelay});try{return (await n.post(chunk57AVKP4H_cjs.d+T,r,{headers:o})).data.text}catch{return}},[w,T,u]);return {recording:ee,speaking:y,transcribing:re,transcript:D,isTranscribingError:te,pauseRecording:ae,startRecording:oe,stopRecording:ie,startTranscribing:se,clearTranscribingError:ce,clearTranscript:ue}};

exports.a = Fe;
