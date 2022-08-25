<template>
  <div class="client-account-item account-orders account-tab-orders">
    <div class="table-responsive">
      <DataTable
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
              render: (data, type, order) => getColumnRender(columns.Number, {order}),
              responsivePriority: 1,
            },
            {
              targets: 1,
              className: 'order-date',
              sortable: false,
              data: 'createdAt',
              render: (data, type, order) => getColumnRender(columns.Date, {order}),
              responsivePriority: 3,
            },
            {
              targets: 2,
              className: 'order-product-thumbnail',
              sortable: false,
              data: 'number',
              render: (data, type, order) => getColumnRender(columns.Data, {order}),
              responsivePriority: 4,
            },
            {
              targets: 3,
              className: 'order-price text-nowrap',
              sortable: false,
              data: 'price',
              type: 'currency',
              render: (data, type, order) => getColumnRender(columns.Price, {order}),
              responsivePriority: 2,
            },
            {
              targets: 4,
              className: 'order-status text-nowrap',
              sortable: false,
              data: 'number',
              render: (data, type, order) => getColumnRender(columns.Status, {order}),
              responsivePriority: 2,
            },
            {
              targets: 5,
              className: 'order-messages',
              sortable: false,
              data: 'number',
              render: (data, type, order) => getColumnRender(columns.Messages, {order}),
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
  }),
  methods: {
    async fetchOrdersForDataTable (sSource, aoData, fnCallback, oSettings) {
      const {data: {
        data: orders,
        pagination,
      }} = await this.$axios.get('user/orders', {params: {
        page: (aoData.find(param => param.name === 'start')?.value || 0) / (aoData.find(param => param.name === 'length')?.value || 10) + 1,
        sort: aoData.find(param => param.name === 'order')?.value?.[0]?.dir || 'desc',
      }});
      console.log({
        orders,
        pagination,
      });
      fnCallback({
        data: orders,
        draw: aoData.find(param => param.name === 'draw')?.value,
        recordsFiltered: pagination.total,
        recordsTotal: pagination.total,
      });
    },
    getColumnRender(columnComponent, data) {
      const tempApp = new Vue({
        ...columnComponent,
        parent: this,
        propsData: data,
      });
      tempApp.$mount();
      //return tempApp.$el;
      const result = tempApp.$el.outerHTML;
      tempApp.$destroy();
      return result;
    },
  },
}
</script>
