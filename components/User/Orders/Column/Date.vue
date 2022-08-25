<template>
  <div class="text-nowrap">
    {{ $dt(order.createdAt, 'datetime') }}
  </div>
</template>

<script>
export default {
  props: ['order'],
}
</script>
