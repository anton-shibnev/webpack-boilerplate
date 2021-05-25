export const Select = () => {
  const B = 'select';
  const $selects = [...document.querySelectorAll(`.${B}`)];
  if ($selects.length === 0) return;

  $selects.forEach(($select) => {
    const $options = $select.querySelector(`.${B}__options`);
    $select.addEventListener('click', () => {
      $select.querySelector(`.${B}__wrap`).classList.toggle('open');

      $options.style.maxHeight = $options.style.maxHeight
        ? null
        : `${$options.scrollHeight}px`;
    });
  });

  const $options = [...document.querySelectorAll(`.${B}__option`)];
  if ($options.length === 0) return;

  $options.forEach(($option) => {
    $option.addEventListener('click', () => {
      if (!$option.classList.contains('selected')) {
        $option.parentNode
          .querySelector(`.${B}__option.selected`)
          .classList.remove('selected');

        $option.classList.add('selected');

        $option
          .closest(`.${B}__wrap`)
          .querySelector(`.${B}__trigger span`).textContent =
          $option.textContent;
      }
    });
  });
};
