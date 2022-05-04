<template>
  <Fragment>
    <ContentWidgetWrapper
      v-for="widget of widgets"
      :key="widget.id"
      :widget="widget"
      :class="getWidgetAdditionalClass(widget)"
    ></ContentWidgetWrapper>
  </Fragment>
</template>

<script>
export default {
  props: {
    type: {type: String, required: true},
    location: {type: String, required: true},
    name: {type: String},
  },
  computed: {
    widgets() {
      const widgets = this.$store.state.site.widgets?.[this.type]?.[this.location];
      if (this.name) {
        const widget = widgets?.find(widget => widget.name === this.name);
        return widget ? [widget] : [];
      }
      return widgets?.length ? widgets : [];
    },
  },
  methods: {
    getWidgetAdditionalClass(widget) {
      const classes = this.$vnode.data.staticClass ? [this.$vnode.data.staticClass] : [];
      if ((widget.name === 'MainthemFooterInfoMenu') &&
        (this.widgets.filter(iteratedWidget => iteratedWidget.name === 'MainthemFooterInfoMenu').indexOf(widget) > 0)
      ) {
        classes.push('hidden-xs');
      }
      return classes.join(' ');
    },
  },
}
</script>
