<template>
  <div class="container clearfix">
    <ContentPageFaqMenu
      :categories="$store.state.page.entity.faqCategories"
    />
    <div class="postcontent nobottomborder col_last clearfix">
      <div id="portfolio" class="faqs">
        <ContentPageFaqList
          v-if="$store.state.page.entity?.faqItems?.length"
          :faq-items="$store.state.page.entity.faqItems"
        ></ContentPageFaqList>
      </div>
    </div>
  </div>
</template>
