<template>
  <div>
    <div>
      some page
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
