<template>
  <fragment>
    <PageTitle
      :title="$trans('order.payment.page-title').replace(':order_number', orderNumber)"
      :breadcrumbs="[
        {title: $trans('default.breadcrumbs.main'), url: $page({name: 'index'})},
        {title: $trans('order.payment.breadcrumb-title').replace(':order_number', orderNumber)},
      ]"
    />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div id="processTabs" style="margin-top: 30px;">
            <div>
              <div
                class="alert alert-info"
                :class="'alert-' + paymentResultClass"
                v-html="$trans('order.payment.message.' + paymentResult).replace(':order_number', orderNumber).replace(':client_account_url', $router.resolve($page({name: 'user/' + PersonalAccountTabEnum.ORDERS})).href)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
import PersonalAccountTabEnum from '@/enums/PersonalAccountTabEnum';
import PaymentResultEnum from '@/enums/PaymentResultEnum';

export default {
  props: ['orderNumber', 'paymentResult'],
  data: () => ({
    PersonalAccountTabEnum,
  }),
  computed: {
    paymentResultClass() {
      return {
        [PaymentResultEnum.PENDING]: 'info',
        [PaymentResultEnum.SUCCESS]: 'success',
        [PaymentResultEnum.FAIL]: 'danger',
      }[this.paymentResult] || 'info';
    },
  },
}
</script>
