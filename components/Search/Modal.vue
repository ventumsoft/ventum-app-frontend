<template>
  <BsModal
    v-if="showing"
    class="modaltop site-search-modal"
    @opened="$refs.input.focus()"
    @closed="$store.commit('search/update', {showing: false, query: null})"
  >
    <template v-slot:header>
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <div class="input-group">
        <div class="input-group-addon">
          <i class="icon-search3"></i>
        </div>
        <input
          ref="input"
          class="form-control search-modal-input"
          type="text"
          :placeholder="$trans('search.query.placeholder')"
          :value="query"
          @input="$store.commit('search/update', {query: $event.target.value})"
        >
      </div>
    </template>
    <template v-slot:body>
      <div class="site-search-result-block"></div>
    </template>
  </BsModal>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState('search', ['showing', 'query']),
  },
  watch: {
    query(value) {
      console.log('watch search query', value);
    },
  },
}
</script>
