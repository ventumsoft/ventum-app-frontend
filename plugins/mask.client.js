import Vue from 'vue';
import {mask} from 'vue-the-mask';

Vue.directive('mask', function (e, b) {
  if (!b.value) {
    return
  }
  mask(e, b);
});
