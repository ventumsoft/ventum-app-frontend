<template>
  <div>
    <h3 v-html="params.header || ''"></h3>
    <table v-if="params.columns" class="table table-striped" style="font-size: 15px">
      <thead>
      <tr>
        <th
          v-for="columnNumber in params.columns"
          v-html="params.th?.[columnNumber - 1] || ''"
        ></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="td of params.td">
        <td
          v-for="columnNumber in params.columns"
          v-html="td?.[columnNumber - 1] || ''"
        ></td>
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
