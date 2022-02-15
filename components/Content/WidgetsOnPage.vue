<template>
  <fragment>
    <ContentWidgetWrapper
      v-for="widget of widgets"
      :key="widget.id"
      :name="widget.class_name"
      :data="{test: '1234'}"
    ></ContentWidgetWrapper>
  </fragment>
</template>

<script>
import {Fragment} from 'vue-frag';

export default {
  components: {
    Fragment,
  },
  props: {
    type: {type: String, required: true},
    location: {type: String, required: true},
    name: {type: String},
  },
  computed: {
    widgets() {
      const widgets = this.$store.state.page.widgets?.[this.type]?.[this.location];
      if (this.name) {
        const widget = widgets?.find(widget => widget.class_name === this.name);
        return widget ? [widget] : [];
      }
      return widgets?.length ? widgets : [];
    },
  },
}
</script>
