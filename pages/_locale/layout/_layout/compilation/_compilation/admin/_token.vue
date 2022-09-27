<template>
  <div></div>
</template>

<script>
export default {
  meta: {
    apiEndpointBuilder: params => 'layout/' + params.layout + '/compilation/' + params.compilation + '/admin/' + params.token,
  },
  middleware: 'creator',
}
</script>
