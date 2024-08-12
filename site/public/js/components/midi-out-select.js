import { MBComponent } from '../music-box-component.js';
import { musicBoxStore } from '../music-box-store.js';

export class MidiOutSelect extends MBComponent {
  constructor() {
    super({
      renderTrigger: ['appState.midiEnabled', 'appState.midiAccess'],
      element: document.querySelector('#midi-out')
    });
  }

  async enableMidi(event) {
    navigator.requestMIDIAccess().then((midiAccess) => {
      musicBoxStore.setState('appState.midiEnabled', true);
      musicBoxStore.setState('appState.midiAccess', midiAccess);
    });
  }

  render_midi_ask() {
    this.element.innerHTML = `
    <button class="midi-out-button">Enable MIDI Output</button>
    `;

    this.element.querySelector('.midi-out-button').addEventListener('click', this.enableMidi.bind(this));
  }

  render_output_options() {
    let result = '';
    const outputs = musicBoxStore.state.appState.midiAccess.outputs;
    let isFirstIteration = true

    for (const entry of musicBoxStore.state.appState.midiAccess.outputs) {
      const output = entry[1];
      result += `<option value="${output.id}" ${isFirstIteration ? 'selected' : ''}>${output.name}</option>`
      isFirstIteration = false;
    }

    return result
  }

  handleChange(event) {
    musicBoxStore.setState('appState.midiOutputId', event.target.value);
  }

  render_midi_select() {
    this.element.innerHTML = `
      <div id="midi-out">
        <label class="midi-out">
          <span class="midi-out__label">MIDI Out</span>
          <select class="select" name="select-midi-out">
          <option value="">none</option>
          ${this.render_output_options()}
          </select>
        </label>
      </div>
    `

    this.element.querySelector('select').addEventListener('change', this.handleChange);
  }

  render() {

    if (musicBoxStore.state.appState.midiEnabled && musicBoxStore.state.appState.midiAccess) {
      this.render_midi_select()
    } else {
      this.render_midi_ask()
    }
  }
}
