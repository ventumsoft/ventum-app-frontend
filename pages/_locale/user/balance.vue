<template>
  <fragment>
    <PageTitle title="User personal account - Bonus balance transactions" />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div>{{ JSON.stringify($route.name) }}</div>
          <div>{{ JSON.stringify($route.params) }}</div>
          <div>{{ JSON.stringify($route.query) }}</div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
