const debounce = {
  bind(el, binding) {
    if (binding.value !== binding.oldValue) {
      let timeout = undefined;
      el.oninput = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          el.dispatchEvent(new Event('change'));
        }, binding.value);
      };
    }
  }
};

export default debounce;
