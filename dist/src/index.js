"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wrtc_1 = __importDefault(require("wrtc"));
class NodeWebRtcAudioStreamSource extends wrtc_1.default.nonstandard.RTCAudioSource {
    addStream(readable, bitsPerSample = 16, sampleRate = 48000, channelCount = 1, _finishCallback = function () { }) {
        let cache = Buffer.alloc(0);
        let streamEnd = false;
        readable.on('data', buffer => {
            cache = Buffer.concat([cache, buffer]);
        });
        readable.on('end', () => {
            streamEnd = true;
        });
        const processData = () => {
            const byteLength = ((sampleRate * bitsPerSample) / 8 / 100) * channelCount; // node-webrtc audio by default every 10ms, it is 1/100 second
            if (cache.length >= byteLength || streamEnd) {
                const buffer = cache.slice(0, byteLength);
                cache = cache.slice(byteLength);
                const samples = new Int16Array(new Uint8Array(buffer).buffer);
                this.onData({
                    bitsPerSample,
                    sampleRate,
                    channelCount,
                    numberOfFrames: samples.length,
                    type: 'data',
                    samples,
                });
            }
            if (!streamEnd || cache.length >= byteLength) {
                setTimeout(() => processData(), 10); // every 10 ms, required by node-webrtc audio
            }
            else
                _finishCallback();
        };
        processData();
    }
}
exports.default = NodeWebRtcAudioStreamSource;
//# sourceMappingURL=index.js.map