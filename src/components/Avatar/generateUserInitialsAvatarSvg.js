import is from 'is_js';

const COLOR_SPECS = [{
  nameRegexp: /^[A-D]/i,
  bgFill: '#59295A',  // purple
  textFill: 'white',
}, {
  nameRegexp: /^[E-H]/i,
  bgFill: '#92205F', // magenta
  textFill: 'white',
}, {
  nameRegexp: /^[I-L]/i,
  bgFill: '#DE4C4C',  // red
  textFill: 'white',
}, {
  nameRegexp: /^[M-P]/i,
  bgFill: '#E9852C',  // dark orange
  textFill: 'white',
}, {
  nameRegexp: /^[Q-T]/i,
  bgFill: '#FBCB22',  // orange
  textFill: 'black',
}, {
  nameRegexp: /^[U-X]/i,
  bgFill: '#00773F',  // green
  textFill: 'white',
}, {
  nameRegexp: /^[Y-Z]/i,
  bgFill: '#1C8FC2',  // cyan
  textFill: 'white',
}];

// https://github.com/bhovhannes/svg-url-loader/blob/4bfa8519/index.js
/* eslint-disable */
const convertSvgToDataUri = (html) => {
  let data = html
    .replace(/\n/g, '')
    .replace(/"/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[{}\|\\\^~\[\]`"<>#%]/g, (match) =>
      '%' + match[0].charCodeAt(0).toString(16).toUpperCase());
  data = 'data:image/svg+xml;charset=utf8,' + data.trim();
  return data;
};
/* eslint-enable */

export const generatePlaceholderSvgXml = (userFirstName, userLastName,
    forcedBgFill, forcedTextFill) => {
  const userFirstNameOrEmpty =
      is.string(userFirstName) && is.not.empty(userFirstName) ? userFirstName : '?';
  const userLastNameOrEmpty =
      is.string(userLastName) && is.not.empty(userLastName) ? userLastName : '?';
  const userFirstInitial = userFirstNameOrEmpty.charAt(0).toUpperCase();
  const userLastInitial = userLastNameOrEmpty.charAt(0).toUpperCase();
  const colorSpec = COLOR_SPECS.find((m) => m.nameRegexp.test(userFirstNameOrEmpty)) || {};
  // `dy` ref: http://stackoverflow.com/a/31376501
  return `<svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect width="100%" height="100%" fill="${forcedBgFill || colorSpec.bgFill || '#FFF'}" />
    <text fill="${forcedTextFill || colorSpec.textFill || '#000'}"
        font-size="14px"
        font-weight="bold"
        font-family="Helvetica"
        text-anchor="middle"
        x="50%" y="50%" dy=".35em">
      ${userFirstInitial || '?'}${userLastInitial || '?'}
    </text>
  </svg>`;
};

export const generatePlaceholderSvgDataUri = (userFirstName, userLastName,
    forcedBgFill, forcedTextFill) =>
  convertSvgToDataUri(
    generatePlaceholderSvgXml(userFirstName, userLastName,
        forcedBgFill, forcedTextFill));

export default generatePlaceholderSvgDataUri;
