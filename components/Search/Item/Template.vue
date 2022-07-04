<template>
  <div class="site-search-result-item">
    <TheLink :to="$page({name: 'template/id', params: {id: template.id}})">
      <img
        v-if="template.preview"
        :src="template.preview"
        :srcset="template.preview2x && (template.preview + ', ' + template.preview2x + ' 2x')"
        :alt="template.title"
      >
      <template v-else>
        &bullet;
      </template>
      {{ template.title }}
    </TheLink>
  </div>
</template>

<script>
export default {
  props: ['template'],
}
</script>
