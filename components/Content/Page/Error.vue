<template>
  <div class="container clearfix">
    <div class="col_half nobottommargin">
      <div class="center" :class="'error' + code">{{ code }}</div>
    </div>
    <div class="col_half nobottommargin col_last topmargin">
      <div class="heading-block nobottomborder">
        <h4 v-html="'site/errors.' + code + '.caption'"></h4>
        <span>{{ 'site/errors.' + code + '.text' + ($store.state.site.settings?.['general:search:enabled'] ? '-with-search' : '-without-search') }}</span>
      </div>
      <ContentPageErrorSearch
        v-if="$store.state.site.settings?.['general:search:enabled']"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    code: 404,
  }),
}
</script>
