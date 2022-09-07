<template>
  <div></div>
</template>

<script>
export default {
  async middleware({from, route, redirect}) {
    redirect(from);
    window.location.href = route.fullPath;
  },
}
</script>
