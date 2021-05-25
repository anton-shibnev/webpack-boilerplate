// import { toggleTypeInput } from './js/toggleTypeInput';
// import { toggleClassInput } from './js/toggleClassInput';

const inputEvents = () => {
  const $wrapInputs = [...document.querySelectorAll('.custom-input')];

  if ($wrapInputs.length === 0) return;

  $wrapInputs.forEach(($wrapInput) => {
    const $input = $wrapInput.querySelector('input');
    const $eye = $wrapInput.querySelector('.custom-input__eye');

    if (!$eye) return;

    // toggleClassInput($wrapInput, $input);
    // toggleClassInput($eye, $input);
    // toggleTypeInput($eye, $input);

    $input.addEventListener('input', () => {
      // toggleClassInput($wrapInput, $input);
      // toggleClassInput($eye, $input);
    });
  });
};

// inputEvents();
