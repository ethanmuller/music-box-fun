import { MBComponent } from '../music-box-component.js';
import { musicBoxStore } from '../music-box-store.js';

export class MidiOutSelect extends MBComponent {
  constructor() {
    super({
      element: document.querySelector('#midi-out')
    });
  }

  async handleChange(event) {
    // musicBoxStore.setState('appState.snapTo', event.target.value);
  }

  render() {
    // const snapToSetting = musicBoxStore.state.appState.snapTo;

    // // See the list of intervals in snap-to-interval.js
    // const selectedNone = snapToSetting === 'none' ? 'selected=""' : '';
    // const selectedGrid = snapToSetting === 'grid' ? 'selected=""' : '';
    // const selected16ths = snapToSetting === '16ths' ? 'selected=""' : '';
    // const selectedQuarterTriplet = snapToSetting === '¼ triplet' ? 'selected=""' : '';
    // const selectedEighthTriplet = snapToSetting === '⅛ triplet' ? 'selected=""' : '';

    this.element.innerHTML = `
      <label class="midi-out">
        <span class="midi-out__label">MIDI Out</span>
        <select class="select" name="select-midi-out">
          <option value="none">none</option>
          <option value="none">USB to MIDI</option>
        </select>
      </label>
    `;

    this.element.querySelector('select').addEventListener('change', this.handleChange);
  }
}
