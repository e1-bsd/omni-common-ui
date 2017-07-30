export const selectElementContents = (el) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  return el;
};

export default selectElementContents;
