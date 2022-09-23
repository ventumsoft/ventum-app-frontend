<template>
  <form class="nobottommargin error-page-search-form" @submit.prevent="openSiteSearchModal">
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-control search-form-input"
        :placeholder="$trans('errors.search.input')"
        :value="$store.state.search.query"
        @input="openSiteSearchModal"
      >
      <div class="input-group-btn">
        <button class="btn btn-success" type="submit">
          {{ $trans('errors.search.button') }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    openSiteSearchModal(event) {
      this.$store.commit('search/update', {
        showing: true,
        query: event?.target?.value || '',
      });
      document.body.classList.toggle('top-search-open', false);
    },
  },
}
</script>
