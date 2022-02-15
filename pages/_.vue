<template>
  <div style="background: lightgray;">
    <div>Page Content</div>
    <div>
      <NuxtLink to="/">Main</NuxtLink>
      <NuxtLink to="/en">En</NuxtLink>
      <NuxtLink to="/stdtsandnbsptststst">stdtsandnbsptststst</NuxtLink>
      <NuxtLink to="/jw45jw45jw45j/jw45j/45j45wj/45j45fd">Some Page</NuxtLink>
    </div>
    <div>{{ JSON.stringify(path) }}</div>
    <div>
      {{ JSON.stringify(data) }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('page', ['path', 'data']),
  },
}
</script>
