<template>
  <div>
    <h3 v-html="i18nParams.header || ''"></h3>
    <table v-if="Number(commonParams.columns)" class="table table-striped" style="font-size: 15px">
      <thead>
      <tr>
        <th
          v-for="columnNumber in Number(commonParams.columns)"
          v-html="i18nParams.th?.[columnNumber - 1] || ''"
        ></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="td of i18nParams.td">
        <td
          v-for="columnNumber in Number(commonParams.columns)"
          v-html="td?.[columnNumber - 1] || ''"
        ></td>
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
