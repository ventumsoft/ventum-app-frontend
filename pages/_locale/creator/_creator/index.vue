<template>
  <div></div>
</template>

<script>
export default {
  meta: {
    apiEndpointBuilder: params => 'products/creator/' + params.creator,
  },
  middleware: 'creator',
}
</script>
