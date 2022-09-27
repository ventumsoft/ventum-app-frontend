<template>
  <div></div>
</template>

<script>
export default {
  meta: {
    apiEndpointBuilder: params => 'template/admin/' + params.token,
  },
  middleware: 'creator',
}
</script>
