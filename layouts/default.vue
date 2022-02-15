<template>
  <div id="wrapper" class="clearfix">
    <div class="wrapper-content">
      <TopBar />
      <TheHeader />
      <Nuxt />
    </div>
    <TheFooter />
    <div id="gotoTop" class="icon-angle-up"></div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$store.state.page.language?.slug,
      },
    };
  },
}
</script>
