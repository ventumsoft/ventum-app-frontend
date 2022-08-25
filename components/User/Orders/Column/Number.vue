<template>
  <div>
    <a href="#" @click.prevent>
      <span class="orders-table"><span class="value">{{ order.number }}</span></span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['order'],
}
</script>
