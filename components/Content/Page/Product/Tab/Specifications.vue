<template>
  <div>
    <h3 class="text-break" v-html="i18nParams.header || ''"></h3>
    <table class="iconlist-large iconlist-color portfolio-meta topmargin-sm text-break prod-spec-table">
      <tbody>
      <tr v-for="line of i18nParams.specification_range" class="row">
        <th class="col-md-2 prod-spec-col-name">
          <span><i class="icon-ok-sign"></i><fragment v-html="line.specification"></fragment></span>
        </th>
        <td class="col-md-10 prod-spec-col-value" v-html="line.specification_value"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['commonParams', 'i18nParams'],
}
</script>
