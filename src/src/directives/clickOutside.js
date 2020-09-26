let clickOutsideEvent;

const clickOutside = {
  bind(el) {
    let initialMacrotaskEnded = false;
    setTimeout(() => {
      initialMacrotaskEnded = true;
    }, 0);

    clickOutsideEvent = (event) => {
      const { target } = event;

      if (initialMacrotaskEnded && !(el === target || el.contains(target))) {
        el.dispatchEvent(new Event('clickOutside'));
      }
    };

    document.addEventListener('mousedown', clickOutsideEvent);
    document.addEventListener('touchstart', clickOutsideEvent);
  },
  unbind() {
    document.removeEventListener('mousedown', clickOutsideEvent);
    document.removeEventListener('touchstart', clickOutsideEvent);
  }
};

export default clickOutside;
