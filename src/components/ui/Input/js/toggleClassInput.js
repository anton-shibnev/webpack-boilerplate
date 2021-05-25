export const toggleClassInput = (el, input) => {
  if (input.value.length > 0) {
    el.classList.add('on');
  } else {
    el.classList.remove('on');
  }
};
