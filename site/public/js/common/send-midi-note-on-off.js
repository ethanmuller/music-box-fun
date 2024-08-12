import { musicBoxStore } from '../music-box-store.js';

  export function sendMidiNoteOnOff(midiNoteNumber, time) {
    const noteOnMessage = [0x90, midiNoteNumber, 0x7f];
    const portID = musicBoxStore.state.appState.midiOutputId;
    const midiAccess = musicBoxStore.state.appState.midiAccess
    if (!midiAccess) return;
    const output = midiAccess.outputs.get(portID);
    if (!output) return;
    output.send(noteOnMessage, 5000);
    const noteOffMessage = [0x80, midiNoteNumber, 0x7f];
    output.send(noteOffMessage, 6000);
  }
