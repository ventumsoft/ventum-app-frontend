<template>
  <div>
    <div class="heading-block" :class="titleClass">
      <h3 v-html="title"></h3>
      <span v-html="subtitle"></span>
    </div>
    <p style="line-height: 1.8;white-space: pre-line" v-html="$nl2br(content)"></p>
    <TheLink
      v-if="link"
      :to="link"
      class="button noshadow button-rounded noleftmargin norightmargin"
    >
      {{ $trans('widgets.content-widgets.find-out-more') }}
    </TheLink>
  </div>
</template>

<script>
export default {
  props: {
    titleClass: {type: String},
    title: {type: String},
    subtitle: {type: String},
    content: {type: String},
    link: {type: String},
  },
}
</script>
