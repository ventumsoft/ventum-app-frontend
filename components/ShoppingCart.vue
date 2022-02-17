<template>
  <div id="top-cart">
    <a href="#" id="top-cart-trigger" @click.prevent>
      <i class="icon-shopping-cart"></i>
      <span>{{ cartItemsCount }}</span>
    </a>
  </div>
</template>

<script>
export default {
  data: () => ({
    cartItemsCount: 0,
  }),
}
</script>
