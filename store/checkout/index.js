import DeliverySystemTypeEnum from '@/enums/DeliverySystemTypeEnum';

export const state = () => ({
  deliveryStepLoading: false,
  deliverySystems: null,
  selectedDeliverySystem: null,
  deliveryData: null,
  deliveryErrors: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
    if (('deliverySystems' in data) || ('deliveryData' in data)) {
      state.selectedDeliverySystem =
        state.deliverySystems?.find(deliverySystem => deliverySystem.id == state.deliveryData?.delivery_system_id) ||
        state.deliverySystems?.[0];
    }
  },
  deliveryData(state, data) {
    if (!state.deliveryData) {
      state.deliveryData = {};
    }
    for (const [key, value] of Object.entries(data)) {
      state.deliveryData[key] = value;
    }
  },
}

export const actions = {
  async fetchDeliveryStepData({state, commit}, {forPriceUpdate} = {}) {
    if (forPriceUpdate) {
      if (!isNeededFetchDeliveryStepDataForPriceUpdating(state.selectedDeliverySystem, state.deliveryData)) {
        return;
      }
    }
    commit('update', {deliveryStepLoading: true});
    let data;
    try {
      ({data} = (await this.$axios.get('checkout/step/delivery', {params: {
        delivery_system_id: state.selectedDeliverySystem?.id,
        city: state.deliveryData?.city,
        warehouse: state.deliveryData?.warehouse,
        street: state.deliveryData?.street,
        building: state.deliveryData?.building,
      }})));
    } catch (exception) {
      return;
    } finally {
      commit('update', {deliveryStepLoading: false});
    }
    if (forPriceUpdate) {
      delete data.deliveryData;
    }
    commit('update', data);
  },
}

function isNeededFetchDeliveryStepDataForPriceUpdating(selectedDeliverySystem, deliveryData) {
  const deliverySystemType = selectedDeliverySystem?.type;

  if (![
    DeliverySystemTypeEnum.NOVA_POSHTA,
    DeliverySystemTypeEnum.NOVA_POSHTA_COURIER,
    DeliverySystemTypeEnum.API_SHIP_TO_POINT,
    DeliverySystemTypeEnum.API_SHIP_TO_DOOR,
    DeliverySystemTypeEnum.EVROPOCHTA_TO_POINT,
    DeliverySystemTypeEnum.EVROPOCHTA_TO_DOOR,
  ].includes(deliverySystemType)) {
    return false;
  }

  if ([
    DeliverySystemTypeEnum.NOVA_POSHTA,
    DeliverySystemTypeEnum.NOVA_POSHTA_COURIER,
    DeliverySystemTypeEnum.API_SHIP_TO_POINT,
    DeliverySystemTypeEnum.API_SHIP_TO_DOOR,
  ].includes(deliverySystemType)) {
    if (!deliveryData?.city) {
      return false;
    }
  }

  return true;
}
