<template>
  <fragment>
    <div v-for="(chunk, chunkIndex) of chunks" class="site-search-result-column">
      <div v-if="chunkIndex === 0" class="site-search-result-column-name">
        {{ $trans('search.sections.' + sectionData.section) }}
      </div>
      <div class="site-search-results">
        <SearchItem
          v-for="item of chunk"
          :key="item.id"
          v-bind="{section: sectionData.section, item}"
        />
        <div v-if="(chunkIndex === chunks.length - 1) && ((sectionData.pagination.page > 1) || (sectionData.pagination.page < sectionData.pagination.pages))" class="site-search-results-paginator">
          <a
            v-if="sectionData.pagination.page > 1"
            href="#"
            class="site-search-result-section-page-button"
            @click.prevent="$store.dispatch('search/fetch', {section: sectionData.section, page: sectionData.pagination.page - 1})"
            v-html="$trans('search.results.prev') + (loading ? ' <i class=&quot;icon-cog spinner&quot;></i>' : '')"
          ></a>
          <a
            v-if="sectionData.pagination.page < sectionData.pagination.pages"
            href="#"
            class="site-search-result-section-page-button"
            @click.prevent="$store.dispatch('search/fetch', {section: sectionData.section, page: sectionData.pagination.page + 1})"
            v-html="$trans('search.results.next') + (loading ? ' <i class=&quot;icon-cog spinner&quot;></i>' : '')"
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
    ...mapState('search', ['loading', 'sectionData']),
    chunks() {
      const result = [];
      for (let i = 0; i < this.sectionData.items.length; i += this.sectionData.limit) {
        result.push(this.sectionData.items.slice(i, this.sectionData.limit + i));
      }
      return result;
    },
  },
}
</script>
