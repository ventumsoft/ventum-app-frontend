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
      grid_num: Math.min(Math.max(0, this.options.max - this.options.min), 4) || undefined,
      onUpdate: event => {
        if (this.value != this.$el.value) {
          this.$emit('input', this.$el.value);
          this.$el.dispatchEvent(new Event('change', {bubbles: true}));
        }
      },
      onFinish: event => {
        this.$emit('input', this.$el.value);
        this.$el.dispatchEvent(new Event('change', {bubbles: true}));
      },
    });
    this.$slider = $el.data('ionRangeSlider');
  },
  watch: {
    options() {
      this.$slider?.update({
        ...this.options,
        grid_num: Math.min(Math.max(0, this.options.max - this.options.min), 4) || undefined,
      });
    },
  },
  destroyed() {
    this.$slider?.destroy();
  },
}
</script>
