<template>
  <NuxtChild />
</template>

<script>
export default {
  head() {
    return {
      title: this.$trans('order.payment.meta-title').replace(':order_number', this.$route.params.orderNumber),
      meta: [{
        name: 'description',
        content: this.$trans('order.payment.meta_description'),
      }],
    };
  },
}
</script>
