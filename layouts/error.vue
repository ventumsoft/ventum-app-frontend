<template>
  <section id="content">
    <div class="content-wrap">
      <ContentPageError
        :code="[403, 404, 500, 503].includes(error.statusCode) && error.statusCode || undefined"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
}
</script>
