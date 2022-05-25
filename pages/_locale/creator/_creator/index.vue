<template>
  <fragment>
    <PageTitle title="Creator Page" />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div>{{ JSON.stringify($route.params) }}</div>
          <div>{{ JSON.stringify($route.query) }}</div>
        </div>
      </div>
    </section>
  </fragment>
</template>
