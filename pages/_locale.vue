<template>
  <NuxtChild />
</template>

<script>
export default {
  async asyncData({route}) {
    console.log('locale asyncData, route: ' + route.name);
  },
}
</script>
