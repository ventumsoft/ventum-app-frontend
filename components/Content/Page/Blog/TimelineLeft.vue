<template>
  <fragment>
    <div class="postcontent nobottommargin clearfix">
      <div id="posts" class="post-timeline small-thumbs clearfix record-timeline">
        <div class="timeline-border" style="height:99%;"></div>
        <div v-for="article of articles" class="entry clearfix">
          <div class="entry-timeline">
            d{{ article.created_at }}<span>M{{ article.created_at }}</span>
            <div class="timeline-divider"></div>
          </div>
          <ContentPageBlogPartPreview v-bind="{article}" />
          <div class="entry-c">
            <div class="entry-title">
              <h2>
                <TheLink :to="article.url">
                  {{ article.display_title }}
                </TheLink>
              </h2>
            </div>
            <ul class="entry-meta clearfix">
              <li class="content-date"><i class="icon-calendar3"></i> {{ article.created_at }}</li>
            </ul>
            <div class="entry-content">
              <p v-html="article.announcement_text"></p>
              <TheLink :to="article.url" class="more-link">
                {{ $trans('blog.more_link') }}
              </TheLink>
            </div>
          </div>
        </div>
      </div>
      <ContentPageBlogPartPagination />
    </div>
    <ContentPageBlogPartSidebar />
  </fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('blog', ['page', 'articles']),
  },
}
</script>
