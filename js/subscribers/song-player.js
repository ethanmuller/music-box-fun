import { musicBoxStore } from '../music-box-store.js';
import { sampler } from '../services/sampler.js';
import { DEAD_ZONE_LENGTH, DEFAULT_TEMPO } from '../utils/constants.js';

const TICKS_PER_PIXEL = 4;

export const songPlayer = {
  isSongNeedsUpdated: true,

  // Convert our songData into a format that ToneJS can read.
  //  - Each note becomes a time-pitch pair: [time, pitch]
  //  - The pitch is a string in Scientific Pitch Notation
  //  - The time is measured in ticks (Pulse Per Quarter):
  //     - The duration of a tick is relative to the tempo.
  //     - 192 ticks = 1 quarter note.
  //     - 48px = 1 quarter note (in our UI).
  //     - Thus, to convert, it's 4 ticks per pixel.
  //
  //  For more details, see:
  //  https://github.com/Tonejs/Tone.js/wiki/Time#ticks
  buildSequence(songData) {
    const sequenceArray = [];
    let tickNum;
    let lastPlayableNoteYPos;

    Object.keys(songData).forEach(pitchId => {
      lastPlayableNoteYPos = 0;

      songData[pitchId].forEach((noteYPos, i) => {
        // Check if a note should be silent or not.
        const isNotePlayable = (i === 0) ? true : (noteYPos - lastPlayableNoteYPos > DEAD_ZONE_LENGTH);
        lastPlayableNoteYPos = isNotePlayable ? noteYPos : lastPlayableNoteYPos;

        // Only add playable (non-silent) notes into the sequence
        if (isNotePlayable) {
          tickNum = noteYPos * TICKS_PER_PIXEL;
          sequenceArray.push([`${tickNum}i`, pitchId]);
        }
      });
    });

    return sequenceArray;
  },

  defineSong() {
    Tone.Transport.loop = false;
    Tone.Transport.timeSignature = 4;
    Tone.Transport.bpm.value = musicBoxStore.state.songState.tempo || DEFAULT_TEMPO;

    const sequence = this.buildSequence(musicBoxStore.state.songState.songData);
    const song = new Tone.Part(function(time, note) {
      console.log(note, '8n', time);
      sampler.triggerAttackRelease(note, '8n', time);
    }, sequence);

    song.start(0);
  },

  toggleSongPlayer() {
    const playheadToViewportTop = document.querySelector('.music-box__playhead').getBoundingClientRect().top;
    const songTopToViewportTop = document.querySelector('#note-lines').getBoundingClientRect().top;
    const songPlayheadPositionPixels = playheadToViewportTop - songTopToViewportTop;
    const songPlayheadPositionTicks = songPlayheadPositionPixels * TICKS_PER_PIXEL;

    if (this.isSongNeedsUpdated) {
      Tone.Transport.cancel();
      this.defineSong();
      this.isSongNeedsUpdated = false;
    }

    if (musicBoxStore.state.appState.isPlaying) {
      console.log('start song player');
      Tone.Transport.ticks = songPlayheadPositionTicks; // I think this works with negative tick positions, so I'll leave it here for now. // Math.max(0, songPlayheadPositionTicks);
      Tone.Transport.start();
    } else {
      console.log('stop song player');
      Tone.Transport.stop();
    }
  },

  songChanged() {
    this.isSongNeedsUpdated = true;
  },

  subscribeToSongChanges() {
    musicBoxStore.subscribe('songState', this.songChanged.bind(this));
  },
  subscribeToPlayState() {
    musicBoxStore.subscribe('appState.isPlaying', this.toggleSongPlayer.bind(this));
  }
}
