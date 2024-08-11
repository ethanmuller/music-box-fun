import { MBComponent } from '../music-box-component.js';
import { musicBoxStore } from '../music-box-store.js';

export class MidiOutSelect extends MBComponent {
  constructor() {
    super({
      renderTrigger: 'appState.midiEnabled',
      element: document.querySelector('#midi-out')
    });
  }

  async enableMidi(event) {
    musicBoxStore.setState('appState.midiEnabled', true);
  }

  render_midi_ask() {
    this.element.innerHTML = `
    <button class="midi-out-button">Enable MIDI Output</button>
    `;

    this.element.querySelector('.midi-out-button').addEventListener('click', this.enableMidi);
  }

  render_midi_select() {
    this.element.innerHTML = `
      <div id="midi-out">
        <label class="midi-out">
          <span class="midi-out__label">MIDI Out</span>
          <select class="select" name="select-midi-out">
          <option value="none">none</option>
          <option value="none">USB to MIDI</option>
          </select>
        </label>
      </div>
    `
  }

  render() {

    if (!musicBoxStore.state.appState.midiEnabled) {
      this.render_midi_ask()
    } else {
      this.render_midi_select()
    }
  }
}
