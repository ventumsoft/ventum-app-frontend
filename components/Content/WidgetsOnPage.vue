<template>
  <Fragment>
    <ContentWidgetWrapper
      v-for="widget of widgets"
      :key="widget.id"
      :name="widget.class_name"
      :data="widget.data"
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
        const widget = widgets?.find(widget => widget.class_name === this.name);
        return widget ? [widget] : [];
      }
      return widgets?.length ? widgets : [];
    },
  },
  methods: {
    getWidgetAdditionalClass(widget) {
      const classes = this.$vnode.data.staticClass ? [this.$vnode.data.staticClass] : [];
      if ((widget.class_name === 'MainthemFooterInfoMenu') &&
        (this.widgets.filter(iteratedWidget => iteratedWidget.class_name === 'MainthemFooterInfoMenu').indexOf(widget) > 0)
      ) {
        classes.push('hidden-xs');
      }
      return classes.join(' ');
    },
  },
}
</script>
