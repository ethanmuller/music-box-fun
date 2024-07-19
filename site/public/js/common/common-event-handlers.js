import { musicBoxStore } from '../music-box-store.js';

// A place for event handlers we're using in multiple components.

// Delegated song-link clicker.
//
// When a link to another musicboxfun song is clicked, we want to jump to the top of the page.
// We do this with click events instead of onhashchange because otherwise we wouldn't be able
// to discern between song-link clicks and back/forward navigation (which we don't want to jump).
// The only case this doesn't catch is browser-bookmarked songs, which is a narrow-enough use-case
// that I'm ok with it falling back to a non-jumping behavior.
export function jumpToTopIfASongWasClicked(event) {

  // We use "closest" to handle clicks both directly on the link and on child elements of the link.
  // For details, see: https://javascript.info/event-delegation
  const clickedLink = event.target.closest('a');

  if (!clickedLink) return;

  const isHashLink = clickedLink.outerHTML.split('href="')[1][0] === '#';

  if (!isHashLink) return;

  // Make sure the music box stops *before* we jump to the top of the page.
  // The box would have paused on state change anyway, but the timing of this
  // explicit pause ensures the user stays at the top of the page.
  if (musicBoxStore.state.appState.isPlaying) {
    musicBoxStore.setState('appState.isPlaying', false);
  }

  window.scrollTo(0, 0);
}

// There's no built-in way to the yPos of the cursor relative to it's parent element,
// so we have to cobble it together. See https://stackoverflow.com/q/34422189/1154642
export function getRelativeYPos(mouseEvent) {
  const parentElPageOffsetTop = mouseEvent.currentTarget.getBoundingClientRect().top + window.scrollY;
  return mouseEvent.pageY - parentElPageOffsetTop;
}
