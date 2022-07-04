<template>
  <fragment>
    <div
      v-for="sectionData of sectionsData"
      class="site-search-result-column"
    >
      <div class="site-search-result-column-name">
        {{ $trans('search.sections.' + sectionData.section) }}
      </div>
      <div class="site-search-results">
        <SearchItem
          v-for="item of sectionData.items"
          :key="sectionData.section + '-' + item.id"
          v-bind="{section: sectionData.section, item}"
        />
        <div v-if="sectionData.pagination.page < sectionData.pagination.pages" class="site-search-results-more">
          <a
            href="#"
            class="site-search-result-column-more-button"
            :data-section="sectionData.section"
            v-html="$trans('search.results.more').replace(':count', sectionData.pagination.total - sectionData.pagination.page * sectionData.pagination.perPage) + (loading ? ' <i class=&quot;icon-cog spinner&quot;></i>' : '')"
            @click.prevent="$store.dispatch('search/fetch', {section: sectionData.section})"
          ></a>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('search', ['loading', 'sectionsData']),
  },
}
</script>
