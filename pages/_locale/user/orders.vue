<template>
  <div class="client-account-item account-orders account-tab-orders">
    <div class="table-responsive">
      <DataTable
        ref="dataTable"
        id="datatable-orders"
        :options="{
          processing: true,
          serverSide: true,
          fnServerData: fetchOrdersForDataTable,
          columns: [
            {
              targets: 0,
              className: 'order-number',
              sortable: true,
              data: 'number',
              render: (data, type, order) => '',
              fnCreatedCell: (nTd, sData, oData, iRow, iCol) => handleDataTableCellCreating(columns.Number, nTd, {order: oData}),
              responsivePriority: 1,
            },
            {
              targets: 1,
              className: 'order-date',
              sortable: false,
              data: 'createdAt',
              render: (data, type, order) => '',
              fnCreatedCell: (nTd, sData, oData, iRow, iCol) => handleDataTableCellCreating(columns.Date, nTd, {order: oData}),
              responsivePriority: 3,
            },
            {
              targets: 2,
              className: 'order-product-thumbnail',
              sortable: false,
              data: 'number',
              render: (data, type, order) => '',
              fnCreatedCell: (nTd, sData, oData, iRow, iCol) => handleDataTableCellCreating(columns.Data, nTd, {order: oData}),
              responsivePriority: 4,
            },
            {
              targets: 3,
              className: 'order-price text-nowrap',
              sortable: false,
              data: 'price',
              type: 'currency',
              render: (data, type, order) => '',
              fnCreatedCell: (nTd, sData, oData, iRow, iCol) => handleDataTableCellCreating(columns.Price, nTd, {order: oData}),
              responsivePriority: 2,
            },
            {
              targets: 4,
              className: 'order-status text-nowrap',
              sortable: false,
              data: 'number',
              render: (data, type, order) => '',
              fnCreatedCell: (nTd, sData, oData, iRow, iCol) => handleDataTableCellCreating(columns.Status, nTd, {order: oData}),
              responsivePriority: 2,
            },
            {
              targets: 5,
              className: 'order-messages',
              sortable: false,
              data: 'number',
              render: (data, type, order) => '',
              fnCreatedCell: (nTd, sData, oData, iRow, iCol) => handleDataTableCellCreating(columns.Messages, nTd, {order: oData}),
              responsivePriority: 1,
            },
          ],
          pageLength: 10,
          order: [[0, 'desc']],
          language: {
            processing: '<div class=&quot;datatable-loader&quot;><i class=&quot;icon-cog spinner&quot;></i></div>',
            search: $trans('account.orders.table.search'),
            lengthMenu: $trans('account.orders.table.lengthMenu'),
            info: $trans('account.orders.table.info'),
            infoEmpty: $trans('account.orders.table.infoEmpty'),
            infoFiltered: $trans('account.orders.table.infoFiltered'),
            infoPostFix: $trans('account.orders.table.infoPostFix'),
            loadingRecords: $trans('account.orders.table.loadingRecords'),
            zeroRecords: $trans('account.orders.table.zeroRecords'),
            emptyTable: $trans('account.orders.table.emptyTable'),
            paginate: {
              first: $trans('account.orders.table.paginate.first'),
              previous: $trans('account.orders.table.paginate.previous'),
              next: $trans('account.orders.table.paginate.next'),
              last: $trans('account.orders.table.paginate.last'),
            },
            aria: {
              sortAscending: $trans('account.orders.table.aria.sortAscending'),
              sortDescending: $trans('account.orders.table.aria.sortDescending'),
            },
          },
        }"
      >
      <thead>
      <tr>
        <th class="order-number text-nowrap">{{ $trans('account.orders.column.number') }}</th>
        <th class="order-date">{{ $trans('account.orders.column.date') }}</th>
        <th class="cart-product-price">
          <div class="order-product-data nobottommargin">
            <div class="order-product-preview">{{ $trans('account.orders.column.preview') }}</div>
            <div class="order-product-name">{{ $trans('account.orders.column.data') }}</div>
          </div>
        </th>
        <th class="order-price">{{ $trans('account.orders.column.sum') }}</th>
        <th class="order-status">{{ $trans('account.orders.column.status') }}</th>
        <th class="order-messages text-nowrap">{{ $trans('account.orders.column.messages') }}</th>
      </tr>
      </thead>
      <tbody></tbody>
      </DataTable>
    </div>
    <UserOrderMessagesModal
      v-if="showingMessagesModalForOrder"
      :key="showingMessagesModalForOrder.id"
      :order="showingMessagesModalForOrder"
      @closed="showingMessagesModalForOrder = null"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import Number from '@/components/User/Orders/Column/Number';
import Date from '@/components/User/Orders/Column/Date';
import Data from '@/components/User/Orders/Column/Data';
import Price from '@/components/User/Orders/Column/Price';
import Status from '@/components/User/Orders/Column/Status';
import Messages from '@/components/User/Orders/Column/Messages';

export default {
  data: () => ({
    columns: {
      Number,
      Date,
      Data,
      Price,
      Status,
      Messages,
    },
    showingMessagesModalForOrder: null,
  }),
  mounted() {
    this.listenOrdersEchoEvents();
  },
  methods: {
    async fetchOrdersForDataTable (sSource, aoData, fnCallback, oSettings) {
      const {data: {
        data: orders,
        pagination,
      }} = await this.$axios.get('user/orders', {params: {
        page: (aoData.find(param => param.name === 'start')?.value || 0) / (aoData.find(param => param.name === 'length')?.value || 10) + 1,
        sort: aoData.find(param => param.name === 'order')?.value?.[0]?.dir || 'desc',
      }});
      fnCallback({
        data: orders,
        draw: aoData.find(param => param.name === 'draw')?.value,
        recordsFiltered: pagination.total,
        recordsTotal: pagination.total,
      });
    },
    handleDataTableCellCreating (columnComponent, cellElement, data) {
      const tempApp = new Vue({
        ...columnComponent,
        parent: this,
        propsData: data,
      });
      tempApp.$on('update', this.updateOrderInDataTable);
      tempApp.$on('reload', this.reloadDataTable);
      tempApp.$on('messages', this.openMessagesModal);
      tempApp.$mount();
      cellElement.append(tempApp.$el);
    },
    updateOrderInDataTable(updatedOrder) {
      const dataTableRow = this.$refs.dataTable.$dataTable.row((index, order, element) => order.id === updatedOrder.id);
      if (dataTableRow?.length) {
        dataTableRow.data(updatedOrder);
        dataTableRow.invalidate();
        const nTr = dataTableRow.node();
        for (const [iCol, nTd] of [...nTr.children].entries()) {
          dataTableRow.context[0].aoColumns[iCol].fnCreatedCell(nTd, null, dataTableRow.data(), dataTableRow.index(), iCol);
        }
      }
    },
    updateOrderInDataTableById(orderId, updaterCallback) {
      const dataTableRow = this.$refs.dataTable.$dataTable.row((index, order, element) => order.id === orderId);
      const order = dataTableRow.data();
      if (order) {
        updaterCallback(order)
        this.updateOrderInDataTable(order);
      }
    },
    reloadDataTable() {
      this.$refs.dataTable.$dataTable.draw();
    },
    openMessagesModal(order) {
      this.showingMessagesModalForOrder = order;
    },
    listenOrdersEchoEvents() {
      this.$echo.private('Api.Site.User.' + this.$auth.user.id)
        .listen('OrderWasSaved', ({order}) => this.updateOrderInDataTable(order))
        .listen('HelpDesk.TicketWasUpdated', ({ticket}) =>
          !this._isDestroyed && this.updateOrderInDataTableById(ticket.orderId, order => {
            order.ticketMessagesTotalCount = ticket.totalMessagesCount;
            order.ticketMessagesUnreadCount = ticket.unreadMessagesCount;
          }))
        .listen('DocumentWasCreated', ({document}) =>
          this.updateOrderInDataTableById(document.orderId, order => {
            order.hasLatestDocumentsForUser = true;
          }));
    },
  },
  beforeDestroy() {
    this.$echo.private('Api.Site.User.' + this.$auth.user.id)
      .stopListening('OrderWasSaved')
      .stopListening('DocumentWasCreated');
  },
}
</script>
