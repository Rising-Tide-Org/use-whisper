import React from 'react'
import { createRoot } from 'react-dom/client'
import { useWhisper } from './useWhisper'
import { key } from './secret'

function App() {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    isTranscribingError,
    pauseRecording,
    startRecording,
    stopRecording,
    startTranscribing,
  } = useWhisper({
    apiKey: key,
    removeSilence: true,
    ffmpegCoreURL: 'http://127.0.0.1:8000/ffmpeg-core.js',
  })

  return (
    <div>
      <p>Recording: {recording}</p>
      <p>Speaking: {speaking}</p>
      <p>Transcribing: {transcribing}</p>
      <p>Transcribed Text: {transcript.text}</p>
      <p>Transcription error: {isTranscribingError}</p>
      <button onClick={() => startRecording()}>Start</button>
      <button onClick={() => pauseRecording()}>Pause</button>
      <button onClick={() => stopRecording()}>Stop</button>
      <button onClick={() => startTranscribing()}>Transcribe</button>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
