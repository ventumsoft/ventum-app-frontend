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
          @input="$event => { params.width = Number($event); if (heightRatio) { params.height = $event * heightRatio; } }"
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
          @input="params.height = Number($event)"
        />
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  props: [
    'params',
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
    widthValue() {
      if (this.params.width !== undefined) {
        return this.params.width;
      }
      if (this.defaults?.width !== undefined) {
        return this.defaults.width;
      }
      return 0;
    },
    heightValue() {
      if (this.params.height !== undefined) {
        return this.params.height;
      }
      if (this.defaults?.height !== undefined) {
        return this.defaults.height;
      }
      return 0;
    },
  },
  mounted() {
    this.$set(this.params, 'area_units', this.units);
    this.$set(this.params, 'width', Number(this.widthValue));
    this.$set(this.params, 'height', Number(this.heightValue));
  },
  destroyed() {
    this.$delete(this.params, 'area_units');
    this.$delete(this.params, 'width');
    this.$delete(this.params, 'height');
  },
}
</script>
