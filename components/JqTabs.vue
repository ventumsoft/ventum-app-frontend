<template>
  <div class="tabs clearfix">
    <slot></slot>
  </div>
</template>

<script>
export default {
  async mounted() {
    await import('jquery-ui/ui/widgets/tabs');
    $(this.$el).tabs();
  },
}
</script>
