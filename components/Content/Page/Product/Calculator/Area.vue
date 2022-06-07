<template>
  <fragment>
    <input
      type="hidden"
      :value="units"
    >
    <div class="col_full">
      <label>{{ widthName + (unitsTitle ? (' (' + unitsTitle + ')') : '') }}:</label>
      <div style="padding: 0px 5px;">
        <IonRangeSlider
          :options="{
            min: widthFrom,
            max: widthTo,
            step: widthStep,
            grid: true,
          }"
          :value="widthValue"
          @input="$event => { $store.commit('product/setParamsValue', {key: 'width', value: Number($event)}); if (heightRatio) { $store.commit('product/setParamsValue', {key: 'quantity', value: $event * heightRatio}); } }"
        />
      </div>
    </div>
    <div class="col_full">
      <label>{{ heightName + (unitsTitle ? (' (' + unitsTitle + ')') : '') }}:</label>
      <div style="padding: 0px 5px;">
        <IonRangeSlider
          :options="{
            min: heightRatio ? (widthFrom * heightRatio) : heightFrom,
            max: heightRatio ? (widthTo * heightRatio) : heightTo,
            step: heightRatio ? (widthStep * heightRatio) : heightStep,
            grid: true,
          }"
          :value="heightRatio ? ((widthValue !== '') ? (widthValue * heightRatio) : '') : heightValue"
          @input="$store.commit('product/setParamsValue', {key: 'height', value: Number($event)})"
        />
      </div>
    </div>
  </fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: [
    'defaults',
    'units',
    'unitsTitle',
    'widthName',
    'widthFrom',
    'widthTo',
    'widthStep',
    'heightRatio',
    'heightName',
    'heightFrom',
    'heightTo',
    'heightStep',
  ],
  computed: {
    ...mapState('product', ['params']),
    widthValue() {
      if (this.params.width !== undefined) {
        return this.params.width;
      }
      if (this.defaults?.width !== undefined) {
        return this.defaults.width;
      }
      return this.widthFrom || 0;
    },
    heightValue() {
      if (this.params.height !== undefined) {
        return this.params.height;
      }
      if (this.defaults?.height !== undefined) {
        return this.defaults.height;
      }
      return this.heightFrom || 0;
    },
  },
  mounted() {
    this.$store.commit('product/setParamsValue', {key: 'area_units', value: this.units});
    this.$store.commit('product/setParamsValue', {key: 'width', value: Number(this.widthValue)});
    this.$store.commit('product/setParamsValue', {key: 'height', value: Number(this.heightValue)});
  },
  destroyed() {
    for (const key of ['area_units', 'width', 'height']) {
      this.$store.commit('product/setParamsValue', {key, value: undefined});
    }
  },
}
</script>
