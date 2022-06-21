import Vue from 'vue'
import 'bootstrap';

Vue.directive('bs', {
  inserted: (el, binding, vnode, oldVnode) => {
    if (binding.modifiers.tooltip) {
      $(el).tooltip(binding.value);
    }
  },
  update: (el, binding, vnode, oldVnode) => {
    const $el = $(el);
    if (binding.modifiers.tooltip &&
      (JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue))
    ) {
      if ($el.data('bs.tooltip')?.$tip) {
        $el.data('bs.tooltip').$tip.removeClass('fade');
        $el.tooltip('hide').tooltip('destroy');
      }
      $el.tooltip(binding.value);
    }
  },
});
