import Vue from 'vue'
import 'magnific-popup';

Vue.directive('mfp', {
  inserted: (el, binding, vnode, oldVnode) => {
    if ((binding.arg === 'image') && (binding.value !== false)) {
      $(el).magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-fade',
        image: {verticalFit: true},
      });
    }
  },
});
