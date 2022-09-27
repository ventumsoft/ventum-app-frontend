<template>
  <div></div>
</template>

<script>
export default {
  meta: {
    apiEndpointBuilder: params => 'layout/' + params.layout + '/view/' + params.token,
  },
  middleware: 'creator',
}
</script>
