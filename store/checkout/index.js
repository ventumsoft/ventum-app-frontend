export const actions = {
  async makeOrder({state, getters}) {
    const {data: {success}} = await this.$axios.post('checkout/order', {
      delivery_system_id: state.delivery.selectedDeliverySystem?.id,
      payment_system_id: state.payment.selectedPaymentSystem?.id,
      payment_route_id: getters['payment/availablePaymentRoutes']?.[0]?.id,
      use_bonus: state.payment.useBonuses,
      device_type: 'desktop', // @fixme
    });
    return success;
  },
}
