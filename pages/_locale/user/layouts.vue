<template>
  <div class="client-account-item account-mockups account-tab-layouts">
    <div class="table-responsive">
      <DataTable
        id="datatable-account"
        :options="{
          ordering: false,
          searching: false,
          paging: false,
        }"
        data-paging="false"
      >
        <thead>
        <tr>
          <th data-responsive-priority="1">{{ $trans('account.creators-templates.table.date') }}</th>
          <th data-responsive-priority="2">{{ $trans('account.layouts.table.preview') }}</th>
          <th class="order-price" data-responsive-priority="3">{{ $trans('account.layouts.table.product') }}</th>
          <th class="order-price" data-responsive-priority="4">{{ $trans('account.layouts.table.used') }}</th>
          <th class="order-price" data-responsive-priority="4">{{ $trans('account.layouts.table.lifetime') }}</th>
          <th class="order-price" data-responsive-priority="2">{{ $trans('account.layouts.table.edit') }}</th>
          <th data-responsive-priority="1"></th>
        </tr>
        </thead>
        <tbody>
        <template v-if="layouts.length">
          <tr v-for="layout of layouts">
            <td style="min-width: 100px;">{{ $dt(layout.createdAt, 'datetime') }}</td>
            <td class="order-product-thumbnail" style="min-width: auto;">
              <div class="">
                <a :href="layout.image" v-mfp:image>
                  <img
                    :src="layout.preview"
                    :srcset="layout.preview2x && (layout.preview + ', ' + layout.preview2x + ' 2x')"
                  >
                </a>
              </div>
            </td>
            <td class="text-nowrap order-price">
              <TheLink v-if="layout.product" :to="layout.product.url">{{ layout.product.name }}</TheLink>
            </td>
            <td
              class="order-price"
              style="min-width: 75px;"
              v-html="layout.ordersNumbers.map(orderNumber => '#' + orderNumber).join('<br>')"
            ></td>
            <td style="min-width: 100px;">
              {{ ((new Date(layout.expireLifetimeAt)) > (new Date)) ? $dt(layout.expireLifetimeAt, 'datetime') : $trans('account.layouts.table.lifetime.removal-soon') }}
            </td>
            <td class="order-price">
              <TheLink
                class="btn btn-default"
                :to="$page({name: 'creator/creator', params: {creator: 'universal'}, query: {layoutId: layout.id}})"
              >{{ $trans('account.layouts.table.edit') }}</TheLink>
            </td>
            <td>
              <button
                type="button"
                class="layout-delete btn btn-link"
                @click="deleteLayout(layout)"
              >
                <i class="icon-trash"></i>
              </button>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td class="empty-table-message" colspan="6">{{ $trans('account.layouts.table.empty') }}</td>
        </tr>
        </tbody>
      </DataTable>
    </div>
    <div class="col_full">
      <div class="pagination-container text-center">
        <ThePagination
          v-if="pagination.pages > 1"
          :pagesCount="pagination.pages"
          :currentPage="pagination.page"
          :routeBuilder="page => $page({...$route, query: {...$route.query, page}})"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({query, $axios}) {
    const {data: {data: layouts, pagination}} = await $axios.get('user/constructor-layouts', {params: {page: Number(query.page) || 1}});
    return {
      layouts,
      pagination,
    };
  },
  watchQuery: true,
  methods: {
    async deleteLayout(layout) {
      if (!await this.$confirm({
        mainTitle: this.$trans('account.layouts.delete.confirmation.mainTitle'),
        mainSubTitle: this.$trans('account.layouts.delete.confirmation.mainSubTitle'),
        mainYesBtn: this.$trans('account.layouts.delete.confirmation.mainYesBtn'),
        mainNoBtn: this.$trans('account.layouts.delete.confirmation.mainNoBtn'),
        yesTitle: this.$trans('account.layouts.delete.confirmation.yesTitle'),
        yesSubTitle: this.$trans('account.layouts.delete.confirmation.yesSubTitle'),
        noTitle: this.$trans('account.layouts.delete.confirmation.noTitle'),
        noSubTitle: this.$trans('account.layouts.delete.confirmation.noSubTitle'),
      })) {
        return;
      }
      let success;
      try {
        ({data: {
          success,
        }} = await this.$axios.delete('user/constructor-layout', {params: {
          id: layout.id,
        }, silenceException: true}));
      } catch (exception) {
        this.$noty(exception.response?.data?.message || exception.message, 'error');
        return;
      }
      if (success) {
        this.$noty(this.$trans('account.layouts.delete-message'), 'error');
        await this.$nuxt.refresh();
      }
    },
  },
}
</script>
