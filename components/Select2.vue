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
      this.$el.dispatchEvent(new Event('change', {bubbles: true}));
    });
  },
  destroyed() {
    const $el = $(this.$el);
    $el.select2('destroy');
  },
}
</script>
