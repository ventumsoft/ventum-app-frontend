<template>
  <div></div>
</template>

<script>
export default {
  meta: {
    apiEndpointBuilder: params => 'layout/' + params.layout + '/edit/' + params.token,
  },
  middleware: 'creator',
}
</script>
