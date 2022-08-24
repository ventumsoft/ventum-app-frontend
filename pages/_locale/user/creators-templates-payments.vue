<template>
  <div class="client-account-item account-personalaccount">
    <div class="table-responsive">
      <DataTable>
        <thead>
        <tr>
          <th>{{ $trans('account.creators-templates-payments.table.date') }}</th>
          <th>{{ $trans('account.creators-templates-payments.table.free') }}</th>
          <th>{{ $trans('account.creators-templates-payments.table.paid') }}</th>
          <th>{{ $trans('account.creators-templates-payments.table.amount') }}</th>
          <th>{{ $trans('account.creators-templates-payments.table.payments') }}</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="invoices.length">
          <tr v-for="invoice of invoices">
            <td>{{ invoice.created_month }}/{{ invoice.created_year }}</td>
            <td>{{ invoice.free_templates_used }}</td>
            <td>{{ invoice.paid_templates_used }}</td>
            <td>{{ invoice.total_amount }}</td>
            <td>{{ $trans('account.creators-templates-payments.status.' + invoice.payment_status) }}</td>
          </tr>
        </template>
        <tr v-else>
          <td class="empty-table-message" colspan="5">{{ $trans('account.creators-templates-payments.table.empty') }}</td>
        </tr>
        </tbody>
      </DataTable>
    </div>
    <div class="col_full">
      <div class="pagination-container">
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
    const {data: {
      data: invoices,
      pagination,
    }} = await $axios.get('user/constructor-templates-invoices', {params: {
      page: Number(query.page) || 1,
    }});
    return {
      invoices,
      pagination,
    };
  },
  watchQuery: true,
}
</script>
