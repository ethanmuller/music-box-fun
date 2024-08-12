import { musicBoxStore } from '../music-box-store.js';

  export function sendMidiNoteOnOff(midiNoteNumber) {
    const noteOnMessage = [0x90, midiNoteNumber, 0x7f];
    const portID = musicBoxStore.state.appState.midiOutputId;
    const midiAccess = musicBoxStore.state.appState.midiAccess
    if (midiAccess) {
      const output = midiAccess.outputs.get(portID);
      output.send(noteOnMessage);
      window.setTimeout(() => {
        const noteOffMessage = [0x80, midiNoteNumber, 0x7f];
        output.send(noteOffMessage);
      }, 100)
    }
  }
