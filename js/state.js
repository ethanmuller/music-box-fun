export const state = {
  songTitle: "",
  // Using Scientific Pitch Notation
  // https://en.wikipedia.org/wiki/Scientific_pitch_notation
  //
  // We save them in state as strings so our proxy can publish
  // the the object keys ("C4", etc) on set() as pubsub events.
  songData: {
    "C4": "",
    "D4": "",
    "E4": "",
    "F4": "",
    "G4": "",
    "A4": "",
    "B4": "",
    "C5": "",
    "D5": "",
    "E5": "",
    "F5": "",
    "G5": "",
    "A5": "",
    "B5": "",
    "C6": "",
  }
};
