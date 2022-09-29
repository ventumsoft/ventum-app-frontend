<template>
  <Fragment>
    <component
      v-for="(widget, index) of widgets"
      :key="index + '-' + widget.id"
      :is="'ContentWidget' + widget.name"
      :class="getWidgetAdditionalClass(widget)"
      :widgetId="widget.id"
      v-bind="widget.data"
    ></component>
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
      const widgets = this.$store.state.widgets[this.type]?.[this.location];
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
      if ((widget.name === 'FooterInfoMenu') &&
        (this.widgets.filter(iteratedWidget => iteratedWidget.name === 'FooterInfoMenu').indexOf(widget) > 0)
      ) {
        classes.push('hidden-xs');
      }
      return classes.join(' ');
    },
  },
}
</script>
