import Vue from 'vue'
import 'owl.carousel/dist/owl.carousel';

Vue.directive('owl-carousel', {
  inserted: (el, binding, vnode, oldVnode) => {
    const $carousel = $(el);
    $carousel.owlCarousel({
      margin: 2,
      nav: true,
      navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
      autoplay: false,
      autoplayHoverPause: true,
      dots: false,
      loop: true,
      lazyLoad: true,
      lazyLoadEager: 3,
      responsive: {
        0: {items: 1},
        400: {items: 2},
        800: {items: 3},
        1200: {items: 4},
      },
      ...binding.value,
    });
  },
});
