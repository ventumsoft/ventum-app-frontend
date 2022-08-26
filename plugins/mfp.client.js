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
    if ((binding.arg === 'gallery') && (binding.value !== false)) {
      $(el).magnificPopup({
        type: 'image',
        delegate: !binding.value?.items && 'a[data-lightbox="gallery-item"]' || undefined,
        items: binding.value?.items || undefined,
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-fade',
        image: {verticalFit: true},
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
        },
      });
    }
  },
});
