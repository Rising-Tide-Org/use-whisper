declare const defaultStopTimeout = 5000;
declare const silenceRemoveCommand = "silenceremove=start_periods=1:stop_periods=-1:start_threshold=-30dB:stop_threshold=-30dB:start_silence=2:stop_silence=2";
declare const whisperApiEndpoint = "https://api.openai.com/v1/audio/";

export { defaultStopTimeout, silenceRemoveCommand, whisperApiEndpoint };
