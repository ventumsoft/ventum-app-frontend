let isPageLoaded = false;
let isUserInteracted = false;
let isPageLoadedAndInteracted = false;
const callbacks = [];

function skipOrTriggerLoadInteractedEvent () {
  if (isPageLoaded && isUserInteracted) {
    isPageLoadedAndInteracted = true;
    window.dispatchEvent(new Event('load-interacted'));
    while (callbacks.length) {
      callbacks.shift()();
    }
  }
}

const handlePageLoad = event => {
  isPageLoaded = true;
  window.removeEventListener('load', handlePageLoad);
  skipOrTriggerLoadInteractedEvent();
};

const handleUserInteract = event => {
  isUserInteracted = true;
  window.removeEventListener('scroll', handleUserInteract);
  window.removeEventListener('mousemove', handleUserInteract);
  window.removeEventListener('mouseover', handleUserInteract);
  skipOrTriggerLoadInteractedEvent();
};

window.addEventListener('load', handlePageLoad);
window.addEventListener('scroll', handleUserInteract);
window.addEventListener('mousemove', handleUserInteract);
window.addEventListener('mouseover', handleUserInteract);

export {isPageLoadedAndInteracted};

export function onPageLoadedAndInteracted (callback) {
  if (isPageLoadedAndInteracted) {
    callback();
  } else {
    callbacks.push(callback);
  }
}
