<template>
  <fragment>
    <template v-if="sectionsData">
      <div class="site-search-sections">
        <div
          class="site-search-section-item"
          :class="{current: !sectionData}"
          @click="$store.dispatch('search/fetch')"
        >
          {{ $trans('search.results.all') }}
          <span class="badge badge-default pull-right">{{ sectionsData.reduce((result, sectionData) => result + sectionData.pagination.total, 0) }}</span>
        </div>
        <div
          v-for="iteratedSectionData of sectionsData"
          class="site-search-section-item"
          :class="{current: sectionData?.section === iteratedSectionData.section}"
          :data-section="iteratedSectionData.section"
          @click="$store.dispatch('search/fetch', {section: iteratedSectionData.section})"
        >
          {{ $trans('search.sections.' + iteratedSectionData.section) }}
          <span class="badge badge-default pull-right">{{ iteratedSectionData.pagination.total }}</span>
        </div>
      </div>
      <div class="site-search-result-columns">
        <SearchColumnsOneSection v-if="sectionData" />
        <SearchColumnsBySections v-else />
      </div>
    </template>
    <div v-else-if="!loading" class="alert alert-warning">
      <i class="icon-warning-sign"></i>
      {{ $trans('search.result.empty') }}
    </div>
  </fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('search', ['loading', 'sectionsData', 'sectionData']),
  },
}
</script>
