<template>
  <input
    :name="name"
    :value="value"
    style="visibility: hidden;"
  />
</template>

<script>
export default {
  props: [
    'name',
    'options',
    'value',
  ],
  async mounted() {
    await import('ion-rangeslider');
    const $el = $(this.$el);
    $el.ionRangeSlider({
      ...this.options,
      onFinish: event => {
        this.$emit('input', this.$el.value);
        //$el.trigger('change');
      },
    });
    this.$slider = $el.data('ionRangeSlider');
  },
  watch: {
    options() {
      this.$slider.update(this.options);
    },
  },
  destroyed() {
    this.$slider.destroy();
  },
}
</script>
