import MobileDetect from 'mobile-detect';
import PaymentResultEnum from '@/enums/PaymentResultEnum';

export const actions = {
  async makeOrder({state, commit, getters, dispatch}) {
    const {data: {
      clientRedirect,
      redirectUrl,
      orderNumber,
      success,
    }} = await this.$axios.post('checkout/order', {
      delivery_system_id: state.delivery.selectedDeliverySystem?.id,
      payment_system_id: state.payment.selectedPaymentSystem?.id,
      payment_route_id: getters['payment/availablePaymentRoutes']?.[0]?.id,
      use_bonus: state.payment.useBonuses,
      device_type: (new MobileDetect(window.navigator.userAgent)).mobile() ? 'mobile' : 'desktop',
    });

    commit('cart/clear', undefined, {root: true});
    dispatch('cart/fetch', undefined, {root: true});
    commit('delivery/clear');
    commit('payment/clear');

    if (clientRedirect) {
      console.log({clientRedirect});
      return;
    }

    if (redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }

    this.$router.push(this.$page({name: 'checkout/success', params: {
      orderNumber,
      paymentResult: success ? null : PaymentResultEnum.FAIL,
    }}));
  },
}
