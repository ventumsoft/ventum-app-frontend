<template>
  <input
    type="file"
  >
</template>

<script>
export default {
  props: [
    'options',
  ],
  async mounted() {
    await import('bootstrap-fileinput');
    const $input = $(this.$el);
    $input.fileinput(this.options);
    if (this.options.swapButtonsPlacement) {
      const $fileinput = $(this.$el.closest('.file-input'));
      $fileinput.find('.input-group>.form-control').before($fileinput.find('.input-group>.input-group-btn'));
      $fileinput.find('.input-group>.input-group-btn').prepend($fileinput.find('.input-group>.input-group-btn>.btn-file'));
      $fileinput.find('.input-group>.input-group-btn>.btn-file>input[type="file"]').css('left', '0');
    }
  },
}
</script>
