<template>
  <client-only>
    <Isotope
      ref="isotope"
      v-bind="{list, options}"
      v-images-loaded:on.progress="() => $refs.isotope.iso.layout()"
    >
      <slot></slot>
    </Isotope>
    <template #placeholder>
      <slot></slot>
    </template>
  </client-only>
</template>

<script>
export default {
  props: {
    list: {type: Array},
    options: {type: Object},
  },
  mounted() {
    setTimeout(() => {
      this.$refs.isotope.iso.on('arrangeComplete', (a) => {
        this.updateTimelineEntriesDividers();
      });
      this.updateTimelineEntriesDividers();
    }, 0);
  },
  methods: {
    updateTimelineEntriesDividers() {
      for (const element of this.$refs.isotope.$el.querySelectorAll('.entry')) {
        if (element.offsetLeft) {
          element.classList.add('alt');
        } else {
          element.classList.remove('alt');
        }
        $(element).find('.entry-timeline').fadeIn();
      }
    },
  },
}
</script>
