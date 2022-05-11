<template>
  <iframe
    class="image_fade alignleft"
    width="500" height="281"
    frameborder="0"
    allowfullscreen
    :src="article.video + '?rel=0&amp;controls=0&amp;showinfo=0'"
  >
  </iframe>
</template>

<script>
export default {
  props: {
    article: {type: Object},
  },
}
</script>
