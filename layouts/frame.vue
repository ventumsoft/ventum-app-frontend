<template>
  <div id="wrapper" class="clearfix">
    <CustomStyles />
    <div class="wrapper-content">
      <Nuxt />
    </div>
    <AuthLoginModal />
    <AuthRecoveryModal />
  </div>
</template>

<style>
html, body {
  background: transparent!important;
}
</style>
