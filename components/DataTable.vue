<template>
  <table
    ref="dataTable"
    class="table order"
    cellspacing="0"
    width="100%"
  >
    <slot></slot>
  </table>
</template>

<script>
export default {
  props: ['options'],
  async mounted() {
    await import('datatables/media/js/jquery.dataTables');
    await import('datatables-bootstrap3-plugin/media/js/datatables-bootstrap3');
    const $fnDataTable = $.fn.dataTable;
    await import('datatables.net-responsive-dt');
    $.fn.dataTable = $fnDataTable;
    if (this.$el.querySelector('.empty-table-message')) {
      return;
    }
    const dataTable = $(this.$refs.dataTable).DataTable({
      info: false,
      bLengthChange: false,
      responsive: true,
      ...this.options,
    });
    dataTable.on('page.dt', event => {
      $('html, body').animate({scrollTop: 0}, 500, 'swing');
    });
    dataTable.on('processing', event => {
      $('html, body').animate({scrollTop: 0}, 500, 'swing');
    });
  },
}
</script>
