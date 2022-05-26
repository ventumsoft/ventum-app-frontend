import Vue from 'vue'
import 'bootstrap';

Vue.directive('bs', {
  inserted: (el, binding, vnode, oldVnode) => {
    if (binding.modifiers.tooltip) {
      $(el).tooltip(binding.value);
    }
  },
});
