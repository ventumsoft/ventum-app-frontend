<template>
  <div class="client-account-item account-personalaccount account-tab-balance">
    <h3>{{ $trans('account.balance.currentbalance') }}: <span>{{ $currency($auth.user.balanceValue) }}</span></h3>
    <div class="table-responsive">
      <DataTable
        id="datatable-account"
        :options="{
          ordering: false,
          searching: false,
          language: {
            processing: $trans('account.balance.datatable.processing'),
            info: $trans('account.balance.datatable.info'),
            infoEmpty: $trans('account.balance.datatable.infoEmpty'),
            loadingRecords: $trans('account.balance.datatable.loadingRecords'),
            emptyTable: $trans('account.balance.datatable.emptyTable'),
            paginate: {
              first: $trans('account.balance.datatable.paginate.first'),
              previous: $trans('account.balance.datatable.paginate.previous'),
              next: $trans('account.balance.datatable.paginate.next'),
              last: $trans('account.balance.datatable.paginate.last'),
            },
          },
        }"
      >
        <thead>
        <tr>
          <th>{{ $trans('account.balance.date') }}</th>
          <th>{{ $trans('account.balance.transaction') }}</th>
          <th class="order-price">{{ $trans('account.balance.amount') }}</th>
          <th class="order-price">{{ $trans('account.balance.balance') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction of transactions">
          <td class="text-nowrap">
            {{ $dt(transaction.created_at, 'datetime') }}
          </td>
          <td style="min-width: 200px;">
            {{ transaction.description }}
            <div v-for="expiration of transaction.expirations">
              <div v-if="expiration.is_expired" class="label label-danger">
                {{ $trans('account.balance.bonus.expiration.done').replace(':date', $dt(expiration.expire_at, 'datetime')) }}
                <template v-if="expiration.burn_amount < expiration.total_amount">({{ $trans('account.balance.bonus.expiration.partially') }}: {{ $currency(expiration.burn_amount) }})</template>
              </div>
              <div v-else class="label label-warning">
                {{ $trans('account.balance.bonus.expiration.pending').replace(':date', $dt(expiration.expire_at, 'datetime')) }}
                <template v-if="expiration.burn_amount < expiration.total_amount">({{ $trans('account.balance.bonus.expiration.partially') }}: {{ $currency(expiration.burn_amount) }})</template>
              </div>
            </div>
          </td>
          <td class="order-price text-nowrap">
            {{ $currency(transaction.change) }}<br>
          </td>
          <td class="order-price text-nowrap">
            {{ $currency(transaction.after) }}<br>
          </td>
        </tr>
        </tbody>
      </DataTable>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios}) {
    const {data: transactions} = await $axios.get('user/bonus-transactions');
    return {
      transactions,
    };
  },
}
</script>
