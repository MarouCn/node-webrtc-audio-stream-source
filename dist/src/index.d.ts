/// <reference types="node" />
import wrtc from 'wrtc';
import { Readable } from 'stream';
declare class NodeWebRtcAudioStreamSource extends wrtc.nonstandard.RTCAudioSource {
    addStream(readable: Readable, bitsPerSample?: number, sampleRate?: number, channelCount?: number, _finishCallback?: () => void): void;
}
export default NodeWebRtcAudioStreamSource;
