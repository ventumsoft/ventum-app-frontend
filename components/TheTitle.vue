<template>
  <section id="page-title">
    <div class="container clearfix">
      <h1 class="nobottommargin">
        {{ title }}
      </h1>
      <ol
        v-if="breadcrumbs?.length"
        class="breadcrumb"
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
      >
        <li
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <NuxtLink v-if="breadcrumb.url" :to="breadcrumb.url">
            <span itemprop="name">{{ breadcrumb.title }}</span>
            <meta itemprop="position" :content="index + 1">
          </NuxtLink>
          <template v-else>
            <span itemprop="name">{{ breadcrumb.title }}</span>
            <meta itemprop="position" :content="index + 1">
          </template>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {type: String, required: true},
    breadcrumbs: {type: Array},
  },
}
</script>
