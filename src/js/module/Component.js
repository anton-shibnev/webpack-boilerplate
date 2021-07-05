export class Component {
  constructor({ className }) {
    this.className = className;
    this.$el = document.querySelector(`.${this.className}`);
  }

  bem(name) {
    const $thing = [
      ...this.$el.querySelectorAll(`.${this.className}__${name}`),
    ];

    if (!$thing.length) {
      return;
    } else if ($thing.length === 1) {
      return $thing[0];
    } else {
      return $thing;
    }
  }
}
