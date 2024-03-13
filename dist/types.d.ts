type UseWhisperConfig = {
    apiKey?: string;
    autoStart?: boolean;
    autoTranscribe?: boolean;
    mode?: 'transcriptions' | 'translations';
    nonStop?: boolean;
    removeSilence?: boolean;
    stopTimeout?: number;
    streaming?: boolean;
    timeSlice?: number;
    whisperConfig?: WhisperApiConfig;
    onDataAvailable?: (blob: Blob) => void;
    onTranscribe?: (blob: Blob) => Promise<UseWhisperTranscript>;
    ffmpegCoreURL?: string;
    voiceActivationThreshold?: number;
};
type UseWhisperTimeout = {
    stop?: NodeJS.Timeout;
};
type UseWhisperTranscript = {
    blob?: Blob;
    text?: string;
};
type UseWhisperReturn = {
    recording: boolean;
    speaking: boolean;
    transcribing: boolean;
    transcript: UseWhisperTranscript;
    isTranscribingError: boolean;
    pauseRecording: () => Promise<void>;
    startRecording: () => Promise<void>;
    stopRecording: () => Promise<void>;
    startTranscribing: () => Promise<void>;
    clearTranscribingError: () => void;
    clearTranscript: () => void;
};
type UseWhisperHook = (config?: UseWhisperConfig) => UseWhisperReturn;
type WhisperApiConfig = {
    model?: 'whisper-1' | string;
    prompt?: string;
    response_format?: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt';
    temperature?: number;
    language?: string;
};

export { UseWhisperConfig, UseWhisperHook, UseWhisperReturn, UseWhisperTimeout, UseWhisperTranscript, WhisperApiConfig };
