export const Accordion = (className) => {
  const B = className;

  const $accordionList = [...document.querySelectorAll(`.${B}`)];
  if (!$accordionList.length) return;

  $accordionList.map(($accordion) => {
    const $panel = $accordion.querySelector(`.${B}__panel`);
    const $trigger = $accordion.querySelector(`.${B}__trigger`);

    $trigger.addEventListener('click', (e) => {
      e.preventDefault;

      $accordion.classList.toggle(`${B}--active`);

      $panel.style.maxHeight = $panel.style.maxHeight
        ? null
        : `${$panel.scrollHeight}px`;
    });
  });
};
