<template>
  <div
    class="address"
    :class="{col_full: !customCol, 'has-error': $store.state.checkout.deliveryErrors?.state}"
  >
    <label>{{ $trans('checkout.delivery_step.form_state') }}:</label>
    <Select2
      class="form-control"
      @input="$store.commit('checkout/deliveryData', {state: $event})"
    >
      <option
        v-for="state of states"
        :value="state.code"
        :selected="state.code == $store.state.checkout.deliveryData?.state"
      >{{ state.name }}</option>
    </Select2>
  </div>
</template>

<script>
export default {
  props: ['customCol'],
  data: () => ({
    states: [],
  }),
  async mounted() {
    ({data: this.states} = await this.$axios.post('geo/regions', {country: 'US'}));
  },
}
</script>
