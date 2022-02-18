<template>
  <section id="page-title">
    <div class="container clearfix">
      <h1 v-if="title" class="nobottommargin">
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
          :class="{active: index === breadcrumbs.length - 1}"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <TheLink :to="breadcrumb.url" :without-link-if-empty="true">
            <span itemprop="name">{{ breadcrumb.title }}</span>
            <meta itemprop="position" :content="index + 1">
          </TheLink>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {type: String},
    breadcrumbs: {type: Array},
  },
}
</script>
