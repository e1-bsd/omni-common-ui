/* eslint-disable */

const COLOR_MATCHERS = [{
  regexp: /^[A-D]/i,
  bgFill: '#59295A',
  textFill: 'white',
}, {
  regexp: /^[E-H]/i,
  bgFill: '#92205F',
  textFill: 'white',
}, {
  regexp: /^[I-L]/i,
  bgFill: '#D8213A',
  textFill: 'white',
}, {
  regexp: /^[M-P]/i,
  bgFill: '#E9852C',
  textFill: 'white',
}, {
  regexp: /^[Q-T]/i,
  bgFill: '#FBCB22',
  textFill: 'black',
}, {
  regexp: /^[U-X]/i,
  bgFill: '#00773F',
  textFill: 'white',
}, {
  regexp: /^[Y-Z]/i,
  bgFill: '#1C8FC2',
  textFill: 'white',
}];

// https://github.com/bhovhannes/svg-url-loader/blob/4bfa8519d18f9ee4a58cd2bb9a3bd54b5a27baa7/index.js
const convertSvgToDataUrl = (html) => {
  let data = html
    .replace(/\n/g, '')
    .replace(/"/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[{}\|\\\^~\[\]`"<>#%]/g, function (match) {
      return '%' + match[0].charCodeAt(0).toString(16).toUpperCase();
    });
  data = 'data:image/svg+xml;charset=utf8,' + data.trim();
  return data;
};

// http://stackoverflow.com/a/31376501
export const generatePlaceholderSvgXml = (userFirstName = '?', userLastName = '?') => {
  const colorSpec = COLOR_MATCHERS.find((m) => m.regexp.test(userFirstName)) || {};
  const userFirstInitial = (userFirstName || '?').charAt(0).toUpperCase();
  const userLastInitial = (userLastName || '?').charAt(0).toUpperCase();
  return `<svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect width="100%" height="100%" fill="${colorSpec.bgFill || '#FFF'}" />
    <text fill="${colorSpec.textFill || '#000'}"
        font-size="14px"
        font-weight="bold"
        font-family="Helvetica"
        text-anchor="middle"
        x="50%" y="50%" dy=".35em">
      ${userFirstInitial}${userLastInitial}
    </text>
  </svg>`;
};

export const generatePlaceholderSvgDataUri = (userFirstName, userLastName) =>
  convertSvgToDataUrl(
    generatePlaceholderSvgXml(userFirstName, userLastName));

export default generatePlaceholderSvgDataUri;
