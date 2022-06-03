<template>
  <select :name="name">
    <slot></slot>
  </select>
</template>

<script>
export default {
  props: [
    'name',
    'options',
    'value',
  ],
  async mounted() {
    await import('select2');
    $.fn.select2.defaults.set('width', '100%');
    $.fn.select2.defaults.set('minimumResultsForSearch', Infinity);
    const $el = $(this.$el);
    $el.select2(this.options);
    $el.on('select2:select', event => {
      this.$emit('input', this.$el.value);
      this.$el.dispatchEvent(new Event('change', {bubbles: true}));
    });
  },
  updated() {
    $(this.$el).data('select2')?._syncS();
  },
  destroyed() {
    const $el = $(this.$el);
    $el?.select2('destroy');
  },
}
</script>
