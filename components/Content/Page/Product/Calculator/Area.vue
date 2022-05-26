<template>
  <fragment>
    <input
      type="hidden"
      name="params[area_units]"
      :value="units"
    >
    <div class="col_full">
      <label>{{ widthName + (unitsTitle ? (' (' + unitsTitle + ')') : '') }}:</label>
      <div style="padding: 0px 5px;">
        <IonRangeSlider
          name="params[width]"
          :options="{
            min: widthFrom,
            max: widthTo,
            step: widthStep,
            grid: true,
          }"
          :value="widthValue"
        />
      </div>
    </div>
    <div class="col_full">
      <label>{{ heightName + (unitsTitle ? (' (' + unitsTitle + ')') : '') }}:</label>
      <div style="padding: 0px 5px;">
        <IonRangeSlider
          name="params[height]"
          :options="{
            min: heightRatio ? (widthFrom * heightRatio) : heightFrom,
            max: heightRatio ? (widthTo * heightRatio) : heightTo,
            step: heightRatio ? (widthStep * heightRatio) : heightStep,
            grid: true,
          }"
          :value="heightRatio ? ((widthValue !== '') ? (widthValue * heightRatio) : '') : heightValue"
        />
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  props: [
    'units',
    'unitsTitle',
    'widthName',
    'widthFrom',
    'widthTo',
    'widthStep',
    'widthValue',
    'heightRatio',
    'heightName',
    'heightFrom',
    'heightTo',
    'heightStep',
    'heightValue',
  ],
}
</script>
