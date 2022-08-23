<template>
  <div class="client-account-item account-personalaccount account-tab-balance">
    <h3>{{ $trans('account.balance.currentbalance') }}: <span>{{ $currency($auth.user.balanceValue) }}</span></h3>
    <div class="table-responsive">
      <table ref="dataTable" id="datatable-account" class="table order" cellspacing="0" width="100%">
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
      </table>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios}) {
    const {data: transactions} = await $axios.get('user/balance-transactions');
    return {
      transactions,
    };
  },
  async mounted() {
    await import('datatables/media/js/jquery.dataTables');
    await import('datatables-bootstrap3-plugin/media/js/datatables-bootstrap3');
    const $fnDataTable = $.fn.dataTable;
    await import('datatables.net-responsive-dt');
    $.fn.dataTable = $fnDataTable;
    const dataTable = $(this.$refs.dataTable).DataTable({
      info: false,
      bLengthChange: false,
      ordering: false,
      searching: false,
      responsive: true,
    });
    dataTable.on('page.dt', event => {
      $('html, body').animate({scrollTop: 0}, 500, 'swing');
    });
    dataTable.on('processing', event => {
      $('html, body').animate({scrollTop: 0}, 500, 'swing');
    });
    //dataTable.on('responsive-display.dt', function (e, datatable, row, showHide, update) {
    //  SEMICOLON.initialize.lightbox();
    //});
  },
}
</script>
