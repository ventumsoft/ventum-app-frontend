<template>
  <div>
    <h3 class="text-break" v-html="params.header || ''"></h3>
    <table class="iconlist-large iconlist-color portfolio-meta topmargin-sm text-break prod-spec-table">
      <tbody>
      <tr v-for="item of params.items" class="row">
        <th class="col-md-2 prod-spec-col-name">
          <span><i class="icon-ok-sign"></i><fragment v-html="item.specification"></fragment></span>
        </th>
        <td class="col-md-10 prod-spec-col-value" v-html="item.value"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['params'],
}
</script>
