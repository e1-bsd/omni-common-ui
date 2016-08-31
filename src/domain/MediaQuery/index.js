let styleMedia = window.styleMedia || window.media;

// For those that don't support matchMedium
if (! styleMedia) {
  const style = document.createElement('style');
  const script = document.getElementsByTagName('script')[0];

  style.type = 'text/css';
  style.id = 'matchmediajs-test';

  script.parentNode.insertBefore(style, script);

  // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
  const info = ('getComputedStyle' in window && window.getComputedStyle(style, null)) ||
    style.currentStyle;

  styleMedia = {
    matchMedium: (media) => {
      const text = `@media ${media}{ #matchmediajs-test { width: 1px; } }`;

      // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
      if (style.styleSheet) {
        style.styleSheet.cssText = text;
      } else {
        style.textContent = text;
      }

      // Test if media query is true or false
      return info.width === '1px';
    },
  };
}

const localMatchMedia = (media) => ({
  matches: styleMedia.matchMedium(media || 'all'),
  media: media || 'all',
});

const hasMediaQueries = localMatchMedia('only all').matches;
let isListening = false;
let timeoutID = 0;// setTimeout for debouncing 'handleChange'
const queries = [];// Contains each 'mql' and associated 'listeners' if 'addListener' is used
const handleChange = () => {
  // Debounce
  clearTimeout(timeoutID);

  timeoutID = setTimeout(() => {
    for (let i = 0, il = queries.length; i < il; i++) {
      const mql = queries[i].mql;
      const listeners = queries[i].listeners || [];
      const matches = localMatchMedia(mql.media).matches;

      // Update mql.matches value and call listeners
      // Fire listeners only if transitioning to or from matched state
      if (matches !== mql.matches) {
        mql.matches = matches;

        for (let j = 0, jl = listeners.length; j < jl; j++) {
          listeners[j].call(window, mql);
        }
      }
    }
  }, 30);
};

export const mediaQuery = (media) => {
  const mql = localMatchMedia(media);
  const listeners = [];
  let index = 0;

  mql.addListener = (listener) => {
    // Changes would not occur to css media type so return now (Affects IE <= 8)
    if (! hasMediaQueries) {
      return;
    }

    // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
    // There should only ever be 1 resize listener running for performance
    if (! isListening) {
      isListening = true;
      window.addEventListener('resize', handleChange, true);
    }

    // Push object only if it has not been pushed already
    if (index === 0) {
      index = queries.push({
        mql,
        listeners,
      });
    }

    listeners.push(listener);
  };

  mql.removeListener = (listener) => {
    for (let i = 0, il = listeners.length; i < il; i++) {
      if (listeners[i] === listener) {
        listeners.splice(i, 1);
      }
    }
  };

  return mql;
};

export default mediaQuery;
